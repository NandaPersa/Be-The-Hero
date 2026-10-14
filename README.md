<h1 align="center">🦸‍♂️ Be The Hero</h1>

<p align="center">
  <strong>Plataforma Full Stack & Mobile para conectar ONGs a pessoas dispostas a ajudar financeiramente em causas específicas.</strong>
</p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=node.js" />
  <img alt="Express" src="https://img.shields.io/badge/Express-4.x-black?style=for-the-badge&logo=express" />
  <img alt="Knex" src="https://img.shields.io/badge/Knex.js-Query_Builder-orange?style=for-the-badge" />
  <img alt="SQLite3" src="https://img.shields.io/badge/SQLite-3-blue?style=for-the-badge&logo=sqlite" />
  <img alt="React" src="https://img.shields.io/badge/React-16.13-61DAFB?style=for-the-badge&logo=react" />
  <img alt="React Native" src="https://img.shields.io/badge/React_Native-Expo-darkblue?style=for-the-badge&logo=react" />
</p>

---

## 📌 1. Visão Geral e Proposta de Valor

O **Be The Hero** é uma solução completa desenvolvida para solucionar a barreira de comunicação e arrecadação de Organizações Não Governamentais (ONGs). A plataforma é composta por três camadas integradas:

- **Painel Web (Frontend):** Espaço administrativo onde as instituições realizam cadastro, gerenciam sua autenticação e cadastram casos e incidentes com descrições detalhadas e metas financeiras.
- **Aplicativo Mobile:** Voltado para os usuários finais (*"heróis"*), permitindo explorar os casos cadastrados em tempo real com Infinite Scroll, filtrar demandas e entrar em contato direto com a ONG via WhatsApp ou E-mail com mensagens dinâmicas pré-preenchidas.
- **API REST (Backend):** Núcleo unificado de regras de negócio, persistência de dados relacional e comunicação stateless.

---

## 💻 2. Stack Tecnológica

| Camada | Tecnologias & Bibliotecas |
| :--- | :--- |
| **Backend** | Node.js, Express, Knex.js (Query Builder), SQLite3, CORS, Crypto (nativo) |
| **Frontend Web** | React.js, React Router DOM (v5), Axios, React Icons, CSS3 puro (Modular & Flexbox) |
| **Mobile** | React Native, Expo, React Navigation (Stack), Expo MailComposer, Deep Linking (Linking API), Intl |
| **Ambiente & Ferramentas** | NVM (Node Version Manager), Git, npm |

---

## ⚙️ 3. Arquitetura e Padrões de Projeto (Design Patterns)

### 🏛️ Arquitetura em Camadas (Layered Architecture / MVC adaptado)
- **Controllers & Routes:** Separação estrita entre a camada de roteamento HTTP e os controladores (`OngController`, `IncidentsController`, `ProfileController`, `SessionController`), isolando as regras de negócio das rotas.
- **Database Layer & Migrations:** Uso do Knex.js para versionamento estrutural do banco de dados relacional (DDL em código através de Migrations) e abstração de consultas via Query Builder, facilitando portabilidade entre SQLite, PostgreSQL ou MySQL sem reescrever queries.

### 🌐 Arquitetura RESTful & Stateless
- **Operações Semânticas:** Utilização estrita dos verbos HTTP (`GET`, `POST`, `DELETE`) e status codes adequados (`200 OK`, `204 No Content`, `401 Unauthorized`, etc.).
- **Autenticação Stateless:** Identificação da entidade solicitante através do cabeçalho HTTP padrão `Authorization`, validando permissões de exclusão de incidentes diretamente na camada de persistência.
- **Paginação com Metadados em Headers:** A API adota paginação por `limit`/`offset` com o envio do total de registros no cabeçalho customizado `X-Total-Count`, otimizando a carga de dados para a `FlatList` do aplicativo mobile.

### ⚛️ Padrões Frontend (React)
- **Single Page Application (SPA):** Navegação fluida sem recarregamento de página gerenciada por roteamento declarativo no cliente via `react-router-dom`.
- **State Management via React Hooks:** Uso intensivo de `useState` para estado local e formulários controlados, e `useEffect` para requisições assíncronas no ciclo de vida dos componentes.
- **API Service Pattern:** Centralização da instância do cliente HTTP com Axios (`api.js`), padronizando `baseURL` e interceptadores de requisição.
- **Persistência de Sessão no Cliente:** Armazenamento do identificador e nome da ONG em `localStorage` para manter o usuário autenticado entre abas e recarregamentos.

### 📱 Padrões Mobile (React Native / Expo)
- **Deep Linking:** Integração com serviços nativos do dispositivo (`Linking.openURL`), abrindo o WhatsApp do usuário diretamente com o número de telefone da ONG e texto dinâmico parametrizado.
- **Native Intent / Mail Composer:** Disparo da aplicação padrão de e-mail do sistema operacional através do módulo `expo-mail-composer`.
- **Infinite Scroll:** Consumo paginado de dados na interface móvel, carregando novos casos sob demanda conforme a rolagem do usuário (`onEndReached`).
- **Internacionalização (Intl API):** Formatação monetária padronizada em Real brasileiro (`pt-BR` / `BRL`) tanto na web quanto no mobile.

---

## 🎯 4. Funcionalidades Detalhadas

- [x] **Cadastro de ONGs:** Geração automática de identificador hexadecimal único via módulo `crypto`.
- [x] **Login e Sessão:** Validação de credenciais da instituição.
- [x] **Gestão de Incidentes:** Cadastro de novos casos com título, descrição e valor necessário.
- [x] **Deleção Segura:** Exclusão de incidentes com validação de autoria (uma ONG não pode deletar casos de outra).
- [x] **Feed Geral de Casos:** Consulta paginada com dados integrados da ONG (nome, cidade, UF, WhatsApp e e-mail).
- [x] **Ação Social Direta:** Botões de ação rápida no aplicativo móvel conectando voluntário e instituição via WhatsApp e E-mail.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (v18 recomendado via NVM)
- npm ou yarn
- Expo CLI (para o app mobile)

### 1. Clonar o repositório
```bash
git clone git@github.com:NandaPersa/Be-The-Hero.git
cd Be-The-Hero
```

### 2. Inicialização Rápida (Backend + Frontend)
Execute o script utilitário:
```bash
chmod +x start.sh
./start.sh
```

Ou execute individualmente cada serviço:

#### Backend
```bash
cd backend
npm install
npx knex migrate:latest
npm start
# API rodando em http://localhost:3333
```

#### Frontend Web
```bash
cd frontend
npm install
npm start
# Web rodando em http://localhost:3000
```

#### Mobile
```bash
cd mobile
npm install
npm start
# Abra o aplicativo Expo Go no seu smartphone e leia o QR Code
```

---

## 📝 Modelos Prontos para Uso

### Opção A: Descrição Rápida (LinkedIn / Currículo)
> **Be The Hero – Plataforma Full Stack & Mobile (Node.js, React & React Native)**  
> Aplicação desenvolvida para aproximar ONGs e apoiadores financeiros de causas sociais. O ecossistema é formado por uma API REST em Node.js com Knex.js e SQLite, um painel web administrativo em React.js para gestão de casos pelas ONGs, e um aplicativo móvel em React Native/Expo com paginação e deep linking (WhatsApp e E-mail) para engajar doadores diretamente nas causas.

### Opção B: Tópicos de Conquistas Técnicas (Entrevistas)
- Projetei e implementei API RESTful com arquitetura em camadas utilizando Node.js e Express.
- Modelei o esquema relacional com controle de versão de banco através de migrations com Knex.js e SQLite.
- Desenvolvi painel SPA responsivo com React.js e React Hooks, consumindo endpoints REST com Axios.
- Desenvolvi o app mobile multiplataforma (Android/iOS) com React Native e Expo, integrando Deep Linking para comunicação direta via WhatsApp e envio de e-mails nativos.

---

<p align="center">Desenvolvido por <strong>Ananda Persa</strong></p>
