# 🤖 Vaarta AI — AI-Powered Website Chatbot

Vaarta AI is an embeddable AI-powered chatbot built to help businesses provide instant responses to website visitors. It can be integrated into websites to answer general questions and assist visitors with website-related queries through a conversational interface.

## 🚀 Live Demo

**Live Website:** http://13.237.178.153/

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](http://13.237.178.153/)

## ✨ Key Features

* **AI-Powered Conversations:** Provides conversational responses to visitor queries using AI integration.
* **Website Embedding:** Designed to integrate a chatbot widget into existing websites.
* **Website Q&A:** Supports answering website-related questions using configured website content.
* **Admin Panel:** Provides an interface to manage chatbot settings and conversations, according to the implemented functionality.
* **Conversation Management:** Stores visitor conversations and messages for chatbot interactions.
* **Full-Stack Architecture:** Integrates a React frontend with a Node.js and Express backend.
* **Responsive Interface:** Designed for convenient interaction across supported screen sizes.

## 🛠️ Tech Stack

**Frontend**

* React.js
* Vite
* JavaScript
* CSS / Bootstrap (where implemented)

**Backend**

* Node.js
* Express.js
* REST APIs

**Database**

* MongoDB
* Mongoose

**AI Integration**

* Groq API
* AI-powered question answering

**Deployment**

* AWS EC2
* Nginx / PM2 (where configured)

## 🏗️ Architecture

1. A website visitor opens the chatbot widget.
2. The widget sends the visitor's message to the backend API.
3. The backend processes the request and invokes the configured AI service.
4. The chatbot returns a response to the visitor.
5. Conversation data can be stored in postgresql for management and retrieval.

## 📂 Project Structure

```text
Vaarta-AI/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   └── package.json
└── README.md
```

*Update the folder structure to match the actual repository.*

## ⚙️ Getting Started

### Prerequisites

* Node.js and npm
* MongoDB connection
* Groq API key

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Vaarta-AI
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file and add the environment variables required by your backend.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Use the exact environment variable names expected by your code.

### 3. Start the backend

```bash
npm run dev
```

Use the start command defined in your backend's `package.json` if it differs.

### 4. Configure the frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Configure the frontend API base URL to point to your local backend.

## 🔐 Security

* Store API keys and database credentials in environment variables.
* Never commit `.env` files or other secrets to GitHub.
* Configure appropriate CORS rules and validate incoming API requests.
* Restrict administrative functionality to authorized users.

## 🎯 Problem Statement

Businesses need an accessible way to respond to common website visitor questions without requiring every interaction to be handled manually. Vaarta AI provides an embeddable conversational interface that can help automate responses and improve visitor access to information.

## 🔮 Future Enhancements

* Improved retrieval-augmented generation (RAG) for website-specific knowledge.
* Additional chatbot customization options.
* Enhanced analytics for conversation activity.
* Support for additional AI providers and integrations.

## 👩‍💻 Author

**Srishty Agarwal**

* GitHub: [srishtyagarwa164-prog](https://github.com/srishtyagarwa164-prog)

---

⭐ If you find this project interesting, consider starring the repository!
