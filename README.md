# 🎲 Tabletop RPG Character Creation

A modern full-stack web application for creating, calculating, and managing tabletop role-playing game (TTRPG) characters.

The project is developed as a collaborative software engineering project using **React**, **TypeScript**, **C#**, **ASP.NET Core Web API**, and **MongoDB**.

---

# 📖 Project Overview

The Tabletop RPG Character Creation application allows players to create and manage RPG characters digitally.

Instead of using paper character sheets, users can:

- Create an account
- Log in securely
- Create RPG characters
- Calculate character statistics
- View all saved characters
- Edit characters
- Delete characters
- Search and filter characters
- Manage their profile

The application is built with a React frontend connected to an ASP.NET Core Web API backend.

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

## Backend

- C#
- ASP.NET Core Web API
- Swagger / OpenAPI
- Repository Pattern
- Dependency Injection
- CORS

## Database

- MongoDB (In Progress)

## Version Control

- Git
- GitHub

---

# ✨ Current Features

## User Authentication

- User Registration
- User Login
- User Profile
- Logout
- Form Validation

(Currently uses Local Storage while backend authentication is being completed.)

---

## Character Management

Users can:

- Create Characters
- View Character Details
- Edit Characters
- Delete Characters
- Save Characters
- Manage Multiple Characters

---

## Character Information

Each character contains:

- Name
- Nickname
- Title
- Age
- Race
- Character Level
- Strength
- Dexterity
- Constitution
- Mind
- Attunement

---

## Automatic Stat Calculation

The backend automatically calculates:

### Maximum HP

```
Maximum HP = Constitution × 10 + Character Level × 5
```

### Current HP

```
Current HP = Maximum HP
```

### Action Points

```
Action Points = 2 + floor(Dexterity ÷ 2)
```

### Initiative

```
Initiative = Dexterity + Mind
```

The frontend sends the character data to the backend and receives the calculated values automatically.

---

# 📊 Dashboard Features

The Character Dashboard includes:

- Total Characters
- Highest Character Level
- Average Strength
- Total Maximum HP
- Search Characters
- Filter by Race
- Sort by:
  - Name
  - Level
  - Strength
  - HP
- Responsive Character Cards

---

# 💻 Frontend Pages

- Login
- Signup
- User Profile
- Character Dashboard
- Character Creation
- Character Details
- About

---

# 🌐 Backend Features

The ASP.NET Core API currently supports:

- Character Calculation
- Character Validation
- Repository Pattern
- Dependency Injection
- Swagger Documentation
- CORS Configuration

---

# 📂 Project Structure

```text
Tabletop-RPG-Character-Creation
│
├── backend
│   ├── TabletopRPG.API
│   │   ├── Controllers
│   │   ├── Models
│   │   ├── Repositories
│   │   ├── Properties
│   │   ├── Program.cs
│   │   └── appsettings.json
│   │
│   └── TabletopRPG.slnx
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── database
├── docs
├── README.md
└── .gitignore
```

---

# 🚀 Running the Project

## Requirements

Install:

- Node.js
- npm
- .NET SDK
- Git

MongoDB will be required once database integration is completed.

---

# Run the Backend

```bash
cd backend/TabletopRPG.API
dotnet run
```

The API should start on:

```
http://localhost:5280
```

Swagger:

```
http://localhost:5280/swagger
```

---

# Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

# Build the Frontend

```bash
cd frontend
npm run build
```

Production files will be generated in:

```
frontend/dist
```

---

# API Endpoint

## Calculate Character

```
POST /api/character/calculate
```

Example Request

```json
{
  "name": "Kaelen",
  "nickname": "The Brave",
  "title": "Guardian",
  "age": 28,
  "primaryRace": "Human",
  "characterLevel": 5,
  "strength": 12,
  "dexterity": 14,
  "constitution": 10,
  "mind": 8,
  "attunement": 6
}
```

Example Response

```json
{
  "id": "generated-id",
  "name": "Kaelen",
  "nickname": "The Brave",
  "title": "Guardian",
  "age": 28,
  "primaryRace": "Human",
  "characterLevel": 5,
  "strength": 12,
  "dexterity": 14,
  "constitution": 10,
  "mind": 8,
  "attunement": 6,
  "maxHp": 125,
  "currentHp": 125,
  "actionPoints": 9,
  "initiative": 22
}
```

---

# Planned API Endpoints

Authentication

```
POST /api/auth/register

POST /api/auth/login
```

Characters

```
GET /api/characters

GET /api/characters/{id}

POST /api/characters

PUT /api/characters/{id}

DELETE /api/characters/{id}
```

---

# Testing

The API can be tested using:

- Swagger UI
- Postman
- Chrome Developer Tools
- React Frontend

A successful request should return:

```
HTTP 200 OK
```

---

# Current Development Status

## ✅ Completed

- GitHub Repository Setup
- React Frontend
- ASP.NET Core Web API
- Login Page
- Signup Page
- User Profile
- Character Dashboard
- Character Creation
- Character Details
- Character Editing
- Character Deletion
- Character Search
- Character Filtering
- Character Sorting
- Responsive Design
- Character Calculation API
- Frontend to Backend Integration
- CORS Configuration

---

## 🚧 In Progress

- MongoDB Integration
- Backend Authentication
- JWT Authentication
- Persistent Character Storage

---

## 🔮 Future Improvements

- Password Encryption
- Character Classes
- Character Equipment
- Character Inventory
- Character Portrait Uploads
- PDF Character Sheets
- Dark Mode
- Toast Notifications
- Role-Based Authorization
- Cloud Deployment

---

# Git Workflow

Development uses feature branches.

Example:

```bash
git checkout -b feature/frontend-ui
```

Commit:

```bash
git add .
git commit -m "Add frontend improvements"
git push -u origin feature/frontend-ui
```

Recommended workflow:

```
feature branch
      ↓
dev
      ↓
main
```

---

# Contributors

- Samuel Fombang
- Faolan Z.
- May

---

# License

This project was developed for educational purposes as part of a Software Engineering course.