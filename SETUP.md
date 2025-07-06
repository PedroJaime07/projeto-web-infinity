# 🔧 Guia de Configuração - Infinity School Calendar

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- Uma conta Google
- Acesso ao Google Cloud Console

## 🚀 Configuração Passo a Passo

### 1. Clone e Instalação

```bash
# Clone o repositório
git clone https://github.com/PedroJaime07/projeto-web-infinity.git
cd projeto-web-infinity

# Instale as dependências
npm install
```

### 2. Configuração do Google Cloud Console

#### 2.1. Acesse o Google Cloud Console
- Vá para [Google Cloud Console](https://console.cloud.google.com/)
- Faça login com sua conta Google

#### 2.2. Crie um Projeto
- Clique no seletor de projeto no topo
- Clique em "Novo Projeto"
- Digite um nome para o projeto (ex: "Infinity School Calendar")
- Clique em "Criar"

#### 2.3. Ative a Google Calendar API
- No menu lateral, vá para "APIs e Serviços" > "Biblioteca"
- Procure por "Google Calendar API"
- Clique na API e depois em "Ativar"

#### 2.4. Configure as Credenciais OAuth2
- Vá para "APIs e Serviços" > "Credenciais"
- Clique em "Criar Credenciais" > "ID do Cliente OAuth 2.0"
- Se solicitado, configure a tela de consentimento OAuth:
  - **Tipo de usuário**: Externo
  - **Nome do aplicativo**: Infinity School Calendar
  - **Email de suporte**: seu-email@gmail.com
  - **Domínios autorizados**: localhost
  - **Escopos**: Adicione `https://www.googleapis.com/auth/calendar`

#### 2.5. Crie o ID do Cliente OAuth2
- **Tipo de aplicativo**: Aplicativo da área de trabalho
- **Nome**: Infinity School Calendar
- Clique em "Criar"

#### 2.6. Baixe as Credenciais
- Após criar, clique em "Baixar JSON"
- Renomeie o arquivo para `credentials.json`
- Coloque-o na raiz do projeto

### 3. Estrutura do Arquivo credentials.json

O arquivo deve ter esta estrutura:

```json
{
  "installed": {
    "client_id": "SEU_CLIENT_ID.apps.googleusercontent.com",
    "project_id": "seu-project-id",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "SEU_CLIENT_SECRET",
    "redirect_uris": ["http://localhost"]
  }
}
```

### 4. Configuração do Calendário

#### 4.1. Obtenha o ID do Calendário
- Acesse [Google Calendar](https://calendar.google.com/)
- No painel lateral, clique nos 3 pontos ao lado do calendário
- Selecione "Configurações e compartilhamento"
- Role para baixo até "Integrar calendário"
- Copie o "ID do calendário"

#### 4.2. Configure o ID no Código
No arquivo `index.html`, linha 171, atualize o src do iframe:

```html
<iframe src="https://calendar.google.com/calendar/embed?src=SEU_ID_DO_CALENDARIO&ctz=America%2FFortaleza" style="border: 0" frameborder="0" scrolling="no"></iframe>
```

### 5. Variáveis de Ambiente (Opcional)

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3001
GOOGLE_CALENDAR_ID=seu-email@gmail.com
```

### 6. Executar o Projeto

```bash
# Iniciar o servidor
npm start

# Ou para desenvolvimento (com auto-reload)
npm run dev
```

### 7. Primeira Execução

Na primeira vez que executar o projeto:

1. Acesse `http://localhost:3001`
2. Uma janela do navegador abrirá automaticamente
3. Faça login com sua conta Google
4. Autorize o acesso ao Google Calendar
5. O token será salvo automaticamente

## 🔐 Usuários Padrão

O sistema vem com dois usuários pré-configurados:

| Email | Senha | Nome |
|-------|-------|------|
| admin@infinity.com | 123456 | Administrador |
| user@infinity.com | 123456 | Usuário |

## 🚨 Problemas Comuns

### Erro: "credentials.json não encontrado"
- Certifique-se de que o arquivo `credentials.json` está na raiz do projeto
- Verifique se o nome está correto (sem espaços ou caracteres especiais)

### Erro: "API não ativada"
- Vá para o Google Cloud Console
- Ative a Google Calendar API
- Aguarde alguns minutos para a ativação

### Erro: "Token expirado"
- Delete o arquivo `token.json`
- Execute o projeto novamente
- Reautorize o acesso

### Erro: "Porta em uso"
- Mude a porta no arquivo `index.js` (linha 212)
- Ou pare outros processos usando a porta 3001

## 📞 Suporte

Se encontrar problemas:

1. Verifique se todos os passos foram seguidos
2. Consulte a documentação do Google Calendar API
3. Abra uma issue no GitHub
4. Entre em contato: contato@infinityschool.com.br

## 🔄 Atualizações

Para manter o projeto atualizado:

```bash
# Puxar as últimas mudanças
git pull origin main

# Reinstalar dependências (se necessário)
npm install

# Reiniciar o servidor
npm start
```

---

**Boa sorte com seu projeto! 🚀** 