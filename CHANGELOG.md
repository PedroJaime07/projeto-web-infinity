# 📝 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-12-19

### ✨ Adicionado
- Sistema de autenticação simples com email e senha
- Integração completa com Google Calendar API
- Criação de eventos com categorização por local e tipo
- Sistema de cores personalizadas no Google Calendar
- Exclusão interativa de eventos com confirmação
- Modo claro/escuro com persistência no localStorage
- Design responsivo para desktop, tablet e mobile
- Sidebar responsiva que se adapta a diferentes tamanhos de tela
- Organização por locais (SALA BERLIN, SALA LONDRES, STUDIO, INFINITY SCHOOL)
- Categorização de eventos (AULAS, REUNIÃO, EVENTOS)
- Subcategorias para AULAS (CURSO, SUPER MÓDULO, AULA COMPARTILHADA)
- Legenda visual com cores por local
- Validação de formulários no frontend e backend
- Tratamento de erros e mensagens informativas

### 🎨 Design
- Interface moderna e intuitiva
- Cores personalizadas para cada local
- Animações suaves e transições
- Ícones FontAwesome
- Tipografia Lato para melhor legibilidade
- Layout adaptativo para diferentes dispositivos

### 🔧 Funcionalidades Técnicas
- Backend Node.js com Express
- Autenticação OAuth2 com Google
- API RESTful para gerenciamento de eventos
- Persistência de dados no Google Calendar
- Sistema de tokens para autenticação
- Validação de dados e sanitização
- Tratamento de erros robusto

### 📱 Responsividade
- Breakpoints otimizados para diferentes dispositivos
- Sidebar que se adapta ao tamanho da tela
- Em mobile, sidebar fica na parte inferior
- Modais responsivos
- Calendário otimizado para diferentes resoluções

### 🔒 Segurança
- Autenticação simples mas segura
- Validação de dados no frontend e backend
- Tokens OAuth2 para acesso ao Google Calendar
- Sanitização de inputs
- Proteção contra ataques básicos

### 📚 Documentação
- README.md completo com instruções de instalação
- SETUP.md com guia detalhado de configuração
- CHANGELOG.md para controle de versões
- package.json configurado corretamente
- .gitignore para proteger informações sensíveis
- Licença MIT

### 🚀 Deploy
- Configuração para Heroku
- Configuração para Vercel
- Instruções de deploy em diferentes plataformas

---

## Versões Futuras

### [1.1.0] - Planejado
- [ ] Sistema de edição de eventos
- [ ] Notificações push
- [ ] Exportação de eventos
- [ ] Múltiplos calendários
- [ ] Sistema de permissões

### [1.2.0] - Planejado
- [ ] Dashboard com estatísticas
- [ ] Relatórios de eventos
- [ ] Integração com outros serviços
- [ ] API pública
- [ ] Webhooks

---

**Nota**: Este projeto segue o versionamento semântico (MAJOR.MINOR.PATCH). 