# AI Live Chat Agent

A real-time AI-powered chat application that allows users to send messages and receive responses from an LLM through a backend API. The application stores chat history in PostgreSQL and maintains session-based conversations.

## Tech Stack

Frontend:
* SvelteKit
* TypeScript

Backend:
* Node.js
* Express.js
* TypeScript

Database:
* PostgreSQL
* Docker

AI:
* Groq API

---

## Running Locally

### 1. Clone the repository

```bash
git clone <repository-url>
cd ai-live-chat-agent
```

### 2. Configure environment variables

Create environment files from templates:

```bash
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
```

Fill values:

Root `.env`

```env
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=chatdb
```

Backend `apps/backend/.env`

```env
PORT=3000
DATABASE_URL=postgresql://your_username:your_password@postgres:5432/chatdb
OPENAI_API_KEY=your_api_key
```

---

### 3. Start Docker services

```bash
docker compose up -d
```

This starts:

* PostgreSQL container
* Backend services (if configured)
* Supporting containers

---

### 4. Install dependencies

Frontend:

```bash
cd apps/frontend
npm install
```

Backend:

```bash
cd apps/backend
npm install
```

---

### 5. Start development servers

Backend:

```bash
cd apps/backend
npm run dev
```

Frontend:

```bash
cd apps/frontend
npm run dev
```

Frontend should be available at:

```text
http://localhost:5173
```

Backend should be available at:

```text
http://localhost:3000
```

---

## Database Setup

Run database migrations:

```bash
npm run migrate
```

Run seed data (if applicable):

```bash
npm run seed
```

The database stores:

* User sessions
* Conversations
* Chat messages

---

## Environment Variables

| Variable          | Description               |
| ----------------- | ------------------------- |
| POSTGRES_USER     | PostgreSQL username       |
| POSTGRES_PASSWORD | PostgreSQL password       |
| POSTGRES_DB       | Database name             |
| DATABASE_URL      | PostgreSQL connection URL |
| OPENAI_API_KEY    | API key for LLM provider  |

---

## Architecture Overview

### Backend Structure

```text
backend/
├── migrations/
├── src/
│   ├── db.ts
│   ├── index.ts
│   └── llm.service.ts
```

Responsibilities:

**index.ts**

* Main application entry point
* Creates Express server
* Registers routes and middleware

**db.ts**

* Database configuration and PostgreSQL connection setup

**llm.service.ts**

* Encapsulates interactions with the LLM provider
* Handles prompt creation and response generation

**migrations/**

* Stores database schema changes and migration scripts

### Design Decisions

**Service separation for LLM interactions**

LLM logic is isolated in a dedicated service file instead of embedding API calls inside route handlers.

Advantages:

* Keeps route handlers clean
* Makes changing providers easier
* Simplifies testing and maintenance

**Database isolated from business logic**

Database connection logic is separated from application logic.

Advantages:

* Easier migration to another database
* Centralized connection management

**Dockerized PostgreSQL**

The database runs inside Docker to ensure consistent local environments.

Advantages:

* Easy onboarding
* No local PostgreSQL installation required
* Environment consistency

---

## LLM Notes

### Provider Used

Groq API

### Prompting Strategy

The backend sends:

* Previous chat history
* Current user message
* System instructions

Example:

```text
You are a helpful assistant for a live chat application.
Respond clearly and concisely.
```

Conversation context is included to maintain continuity across messages.

---

## Trade-offs

### Current trade-offs

* Session-based identity instead of user authentication
* Full conversation history sent to model
* Basic prompting approach

---

## If I Had More Time

* Add streaming responses
* Add authentication and user accounts
* Add vector embeddings and retrieval (RAG)
* Add token usage tracking
* Add rate limiting
* Improve prompt engineering