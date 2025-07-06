const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));


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


const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');

// Verificar se as credenciais estão em variáveis de ambiente ou arquivo
function getCredentialsPath() {
  // Sempre usar arquivo credentials.json por enquanto
  return path.join(process.cwd(), 'credentials.json');
}

const CREDENTIALS_PATH = getCredentialsPath();


async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client) {
  // Usar arquivo credentials.json
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  console.log('Iniciando processo de autorização...');
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    console.log('Token encontrado, usando credenciais salvas');
    return client;
  }
  
  console.log('Token não encontrado, iniciando autenticação...');
  
  // Usar arquivo credentials.json
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
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
    
    const event = {
      summary: summary,
      description: descricaoCompleta,
      location: local,
      colorId: getColorId(local), 
      start: {
        dateTime: new Date(start).toISOString(),
        timeZone: 'America/Fortaleza'
      },
      end: {
        dateTime: new Date(end).toISOString(),
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




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse http://localhost:${PORT}/api/events para ver os eventos`);
});