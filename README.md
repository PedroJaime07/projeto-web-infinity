# 📅 Infinity School Calendar

Sistema de gerenciamento de eventos e calendário integrado ao Google Calendar para a Infinity School.

## 🚀 Funcionalidades

### ✨ Principais Recursos
- **Autenticação simples** com email e senha
- **Criação de eventos** integrada ao Google Calendar
- **Organização por locais**: SALA BERLIN, SALA LONDRES, STUDIO, INFINITY SCHOOL
- **Categorização**: AULAS, REUNIÃO, EVENTOS
- **Subcategorias para AULAS**: CURSO, SUPER MÓDULO, AULA COMPARTILHADA
- **Cores personalizadas** no Google Calendar baseadas no local
- **Exclusão interativa** de eventos com confirmação
- **Modo claro/escuro** com persistência
- **Design responsivo** para desktop, tablet e mobile
- **Sidebar responsiva** que se adapta a diferentes tamanhos de tela

### 🎨 Sistema de Cores
- **SALA BERLIN**: Vermelho (#f44336)
- **SALA LONDRES**: Verde (#4caf50)
- **STUDIO**: Roxo (#9c27b0)
- **INFINITY SCHOOL**: Azul (#2196f3)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização com design responsivo
- **JavaScript (ES6+)** - Lógica da aplicação
- **Google Calendar API** - Integração com calendário

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Google APIs** - Autenticação OAuth2 e Calendar API

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- Conta Google com Google Calendar ativado
- Credenciais do Google Cloud Console

## 🔧 Instalação

> **✅ Repositório**: Este projeto está disponível em [https://github.com/PedroJaime07/projeto-web-infinity](https://github.com/PedroJaime07/projeto-web-infinity)

### 1. Clone o repositório
```bash
git clone https://github.com/PedroJaime07/projeto-web-infinity.git
cd projeto-web-infinity
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as credenciais do Google

#### 3.1. Acesse o Google Cloud Console
- Vá para [Google Cloud Console](https://console.cloud.google.com/)
- Crie um novo projeto ou selecione um existente
- Ative a Google Calendar API

#### 3.2. Configure as credenciais OAuth2
- Vá para "APIs & Services" > "Credentials"
- Clique em "Create Credentials" > "OAuth 2.0 Client IDs"
- Configure o tipo de aplicação (Desktop app)
- Baixe o arquivo JSON das credenciais

#### 3.3. Configure o arquivo de credenciais
- Renomeie o arquivo baixado para `credentials.json`
- Coloque-o na raiz do projeto

### 4. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3001
GOOGLE_CALENDAR_ID=seu-email@gmail.com
```

### 5. Execute o projeto
```bash
node index.js
```

### 6. Acesse a aplicação
- Abra o navegador e acesse: `http://localhost:3001`
- Na primeira execução, será necessário autorizar o acesso ao Google Calendar

## 👥 Usuários Padrão

O sistema vem com dois usuários pré-configurados:

| Email | Senha | Nome |
|-------|-------|------|
| admin@infinity.com | 123456 | Administrador |
| user@infinity.com | 123456 | Usuário |

## 📱 Como Usar

### 1. Login
- Acesse `http://localhost:3001/login.html`
- Use uma das credenciais padrão
- Após o login, você será redirecionado para o calendário

### 2. Criar Evento
- Clique no botão "CRIAR EVENTO" na sidebar
- Preencha os campos obrigatórios:
  - **Título**: Nome do evento
  - **Local**: Selecione entre as opções disponíveis
  - **Categoria**: AULAS, REUNIÃO ou EVENTOS
  - **Subcategoria**: (apenas para AULAS)
  - **Data e hora**: Início e fim do evento
- Clique em "Criar evento"

### 3. Excluir Evento
- Clique no botão "EXCLUIR EVENTO" na sidebar
- Visualize a lista de eventos com cores por local
- Clique em "Excluir" ao lado do evento desejado
- Confirme a exclusão

### 4. Modo Claro/Escuro
- Clique no ícone de sol/lua no cabeçalho
- A preferência é salva automaticamente

## 🏗️ Estrutura do Projeto

```
infinity-school-calendar/
├── css/
│   ├── login.css          # Estilos da página de login
│   ├── reset.css          # Reset CSS
│   └── style.css          # Estilos principais
├── icons/
│   └── fundologin.jpg     # Imagem de fundo do login
├── js/
│   ├── calendario.js      # Lógica do calendário e eventos
│   ├── login.js           # Lógica de autenticação
│   ├── register.js        # Lógica de registro (não implementado)
│   └── script.js          # Scripts gerais
├── index.html             # Página principal
├── login.html             # Página de login
├── index.js               # Servidor Express
├── credentials.json       # Credenciais do Google (não versionado)
├── token.json            # Token de autenticação (não versionado)
└── README.md             # Esta documentação
```

## 🔌 API Endpoints

### Autenticação
- `POST /api/login` - Login do usuário
- `GET /api/check-auth` - Verificar autenticação
- `POST /api/logout` - Logout do usuário

### Eventos
- `GET /api/events` - Listar eventos
- `POST /api/events` - Criar evento
- `PUT /api/events/:id` - Atualizar evento
- `DELETE /api/events/:id` - Excluir evento

## 🎨 Design Responsivo

### Breakpoints
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: 480px - 768px
- **Mobile pequeno**: < 480px

### Características
- Sidebar se adapta ao tamanho da tela
- Em mobile, sidebar fica na parte inferior
- Modais responsivos
- Calendário otimizado para diferentes dispositivos

## 🔒 Segurança

- Autenticação simples com validação no backend
- Tokens OAuth2 para acesso ao Google Calendar
- Validação de dados no frontend e backend
- Sanitização de inputs


## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Pedro Jaime**
- GitHub: [@PedroJaime07](https://github.com/PedroJaime07)
- Repositório: [projeto-web-infinity](https://github.com/PedroJaime07/projeto-web-infinity)

**Infinity School**
- Email: contato@infinityschool.com.br
- Website: https://www.infinityschool.com.br

## 🙏 Agradecimentos

- Google Calendar API
- Infinity School pela oportunidade
- Comunidade de desenvolvedores

---

**Desenvolvido com ❤️ pela Infinity School** 