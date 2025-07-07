const express = require('express');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// Configuração do Google Calendar
const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Função para criar credenciais a partir de variáveis de ambiente
function getCredentials() {
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    return {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uris: [process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/oauth2callback']
    };
  } else {
    // Fallback para arquivo local (desenvolvimento)
    const credentialsPath = path.join(__dirname, 'credentials.json');
    if (fs.existsSync(credentialsPath)) {
      return JSON.parse(fs.readFileSync(credentialsPath));
    }
    throw new Error('Credenciais do Google não encontradas. Configure as variáveis de ambiente GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET.');
  }
}


app.get('/', (req, res) => {
  res.redirect('/login.html');
});

const usuarios = [
  { email: 'admin@infinity.com', senha: '123456', nome: 'Administrador' },
  { email: 'user@infinity.com', senha: '123456', nome: 'Usuário' }
];

app.post('/api/login', (req, res) => {
  const {email, senha} = req.body
  const usuario = usuarios.find(e => e.email === email && e.senha === senha)
  
  if (usuario) {
    res.json({success: true, usuario: usuario.nome})
  } else {
    res.status(401).json({ success: false, message: 'Email ou senha incorretos' });
  }
});

app.get('/api/check-auth', (req, res) => {
  res.json({ success: true });
});


app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/logout', (req, res) => {
  res.json({ success: true });
});


const TOKEN_PATH = path.join(process.cwd(), 'token.json');

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.promises.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  // Usar credenciais de variáveis de ambiente ou arquivo
  const credentials = getCredentials();
  const key = credentials.installed || credentials.web;
  
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.promises.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  console.log('Iniciando processo de autorização...');
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    console.log('Token encontrado, usando credenciais salvas');
    return client;
  }
  
  console.log('Token não encontrado, iniciando autenticação...');
  
  // Usar credenciais de variáveis de ambiente ou arquivo
  const credentials = getCredentials();
  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
  
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
  // Para produção, você precisará implementar o fluxo OAuth2 completo
  // Por enquanto, vamos usar o arquivo de token se existir
  throw new Error('Autenticação OAuth2 não configurada para produção. Configure as variáveis de ambiente.');
}


app.get('/api/events', async (req, res) => {
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: 'v3', auth });
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    res.json(response.data.items || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const { summary, description, local, categoria, subcategoria, start, end } = req.body;
    
    if (!summary || !local || !categoria || !start || !end) {
      console.log('Dados faltando:', { summary, local, categoria, start, end }); // Debug
      return res.status(400).json({ 
        error: 'Dados obrigatórios: summary, local, categoria, start e end são necessários' 
      });
    }

    if (categoria === 'AULAS' && !subcategoria) {
      return res.status(400).json({ 
        error: 'Subcategoria é obrigatória para eventos do tipo AULAS' 
      });
    }

    const auth = await authorize();
    const calendar = google.calendar({ version: 'v3', auth });
    
    
    function getColorId(local) {
      if (local.includes('BERLIN')) {
        return '1'; 
      } else if (local.includes('LONDRES')) {
        return '2'; 
      } else if (local.includes('STUDIO')) {
        return '3'; 
      } else if (local.includes('INFINITY SCHOOL')) {
        return '4'; 
      } else {
        return '1'; 
      }
    }
    
    let descricaoCompleta = '';
    if (description) {
      descricaoCompleta += `Descrição: ${description}\n`;
    }
    descricaoCompleta += `Local: ${local}\n`;
    descricaoCompleta += `Categoria: ${categoria}`;
    if (subcategoria) {
      descricaoCompleta += `\nTipo: ${subcategoria}`;
    }
    
    // Validar e converter as datas
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.log('Datas inválidas recebidas:', { start, end });
      return res.status(400).json({ 
        error: 'Formato de data inválido. Use o formato YYYY-MM-DDTHH:MM' 
      });
    }
    
    const event = {
      summary: summary,
      description: descricaoCompleta,
      location: local,
      colorId: getColorId(local), 
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'America/Fortaleza'
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'America/Fortaleza'
      }
    };
   

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    
    res.status(201).json(response.data);
  } catch (err) {
    console.error('Erro ao criar evento:', err);
    console.error('Dados recebidos:', req.body);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: 'v3', auth });
    const eventId = req.params.id;
    const event = req.body; // Novos dados do evento
    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      resource: event,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const auth = await authorize();
    const calendar = google.calendar({ version: 'v3', auth });
    const eventId = req.params.id;
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });
    res.json({ message: 'Evento deletado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse http://localhost:${PORT}/api/events para ver os eventos`);
});