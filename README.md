# 🚀 Future (Project Name)

A full-stack AI Flow application built with **React + React Flow (Frontend)** and **Node.js + MongoDB (Backend)**.

---

## 📁 Project Structure

```
Future/
│
├── frontend/   → React + React Flow UI
├── backend/    → Node.js + Express + MongoDB API
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-link>
cd Future
```

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🖥️ Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend will run on:

```
http://localhost:5000
```

---

## 🗄️ Database Setup

* Make sure MongoDB is running locally
* Database Name:

```
future
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **backend** folder and add:

```env
MONGO_URI=mongodb://localhost:27017/future
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

---

## ▶️ How It Works

1. User enters a prompt in the **Input Node**
2. Clicks **Run**
3. Frontend sends request to backend
4. Backend calls AI API
5. Response is returned and displayed in **Result Node**
6. Flow data is saved to MongoDB

---

## 📌 Features

* 🔄 React Flow UI with connected nodes
* 🤖 AI response generation
* 💾 Save flows to MongoDB
* 🔗 Backend API integration

---

## 🛠️ Tech Stack

* Frontend: React, React Flow
* Backend: Node.js, Express
* Database: MongoDB
* AI API: OpenRouter

---

## ⚠️ Note

This project uses a local MongoDB instance. Ensure MongoDB is installed and running before starting the backend.

---

## 📬 Author

Future Project 🚀
