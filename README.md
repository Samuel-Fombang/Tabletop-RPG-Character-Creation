# Tabletop-RPG-Character-Creation

## Project Overview

The Tabletop-RPG-Character-Creation application is designed to help players create, customize, and manage tabletop role-playing game (RPG) characters.

Users will be able to create characters by entering information such as name, race, class, age, and attributes. The application will apply the game rules and calculations defined for the project.

This is a final-year group project developed by Group 2.

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite

## Backend

- C# .NET Web API

## Database

- MongoDB
- MongoDB .NET Driver

## Version Control

- Git
- GitHub

---

# Project Structure

```text
Tabletop-RPG-Character-Creation
│
├── backend
│   └── TabletopRPG.API
│       └── C# .NET Web API
│
├── frontend
│   └── React + TypeScript + Vite
│
├── database
│   └── MongoDB scripts and documentation
│
├── docs
│
└── README.md
```

---

# Software Requirements

Before running the project, make sure the following software is installed:

| Software | Version |
|----------|---------|
| .NET SDK | 10.0.203 |
| Node.js | Latest LTS version |
| npm | Comes with Node.js |
| React | 19.x |
| TypeScript | Latest version from package.json |
| Vite | 8.x |
| Git | Latest version |
| MongoDB | Latest Community Edition |
| Visual Studio 2022 or Visual Studio Code | Latest version |

---

# Verify Installation

Run the following commands:

```bash
dotnet --version
node -v
npm -v
git --version
```

---

# Getting Started

## 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/Samuel-Fombang/Tabletop-RPG-Character-Creation.git
```

Move into the project folder:

```bash
cd Tabletop-RPG-Character-Creation
```

Switch to the development branch:

```bash
git checkout Dev
```

---

# 2. Backend Setup

The backend is developed using C# .NET Web API.

Navigate to the backend project:

```bash
cd backend/TabletopRPG.API
```

Restore dependencies:

```bash
dotnet restore
```

Build the project:

```bash
dotnet build
```

Run the API:

```bash
dotnet run
```

The backend will start on:

```text
http://localhost:5089
```

---

# 3. Frontend Setup

The frontend is developed using React, TypeScript, and Vite.

Open a new terminal.

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will start on:

```text
http://localhost:5173
```

Open this address in your browser.

---

# 4. Database Setup

This project uses MongoDB as the database.

## Prerequisites

Install:

- MongoDB Community Edition
- MongoDB Compass (optional)

Make sure MongoDB is running before starting the backend.

---

## MongoDB Connection

The backend will connect to a local MongoDB database during development.

Default connection string:

```text
mongodb://localhost:27017
```

Database name:

```text
TabletopRPG
```

> Note: MongoDB connection and database models will be implemented during the development phase.

---

# Running the Complete Application

The application requires two terminals.

## Terminal 1 - Backend

```bash
cd backend/TabletopRPG.API

dotnet run
```

Backend URL:

```text
http://localhost:5089
```

---

## Terminal 2 - Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# Git Team Workflow

This project follows the Git workflow below:

1. Clone the repository.
2. Switch to the `Dev` branch.
3. Create a feature branch from `Dev`.
4. Work on the assigned task.
5. Commit changes using clear commit messages.
6. Push the feature branch to GitHub.
7. Create a Pull Request.
8. Review and merge changes into `Dev`.
9. Merge `Dev` into `main` after testing.

This workflow keeps the main branch stable and allows safe collaboration between team members.

---

# Future Development

Planned features:

- Character creation interface
- Character validation
- RPG character attributes and calculations
- Character management
- MongoDB database integration
- REST API endpoints
- Frontend and backend communication
- Complete tabletop RPG character system

---

# Contributors

Final Year Project – Group 2

- Faolan
- Samuel
- Max