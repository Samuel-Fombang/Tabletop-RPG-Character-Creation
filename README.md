# Tabletop-RPG-Character-Creation

## Project Overview

Tabletop-RPG-Character-Creation is a final-year group project developed by three students. The application allows users to create and manage tabletop RPG characters through a user-friendly interface.

### Technology Stack

**Frontend**

* React
* TypeScript
* Vite

**Backend**

* C# .NET Web API

**Database**

* MongoDB

## Project Structure

```text
Tabletop-RPG-Character-Creation
│
├── backend
├── frontend
├── database
├── docs
└── README.md
```
## Software Requirements

Before running the project, make sure the following software is installed:

| Software                                 | Version                          |
| ---------------------------------------- | -------------------------------- |
| .NET SDK                                 | 10.0.203                         |
| Node.js                                  | Latest LTS version               |
| npm                                      | Comes with Node.js               |
| React                                    | 19.x                             |
| TypeScript                               | Latest version from package.json |
| Vite                                     | 8.x                              |
| Git                                      | Latest version                   |
| MongoDB                                  | Latest Community Edition         |
| Visual Studio 2022 or Visual Studio Code | Latest version                   |

## Verify Your Installation

Run the following commands to check your installed versions:

```bash
dotnet --version
node -v
npm -v
git --version
```
## Getting Started

### 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/Samuel-Fombang/Tabletop-RPG-Character-Creation.git
```

Move into the project folder:

```bash
cd Tabletop-RPG-Character-Creation
```

---

### 2. Backend Setup

Move into the backend folder:

```bash
cd backend
```

Restore the project:

```bash
dotnet restore
```

Build the project:

```bash
dotnet build
```

Run the API:

```bash
dotnet run --project TabletopRPG.API
```

The backend will start on a local URL similar to:

```text
http://localhost:5089
```

---

### 3. Frontend Setup

Open a new terminal.

Move to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will start on a local URL similar to:

```text
http://localhost:5173
```
## Database Setup

This project uses **MongoDB** as its database.

### Prerequisites

* Install MongoDB Community Edition.
* Make sure the MongoDB service is running on your computer.

### Default Connection

During development, the backend will connect to a local MongoDB server.

Example connection string:

```text
mongodb://localhost:27017
```

The database name for this project will be:

```text
TabletopRPG
```

> **Note:** The backend connection to MongoDB will be implemented during the development phase of the project.

## Team Workflow

This project follows the Git workflow below:

1. Clone the repository.
2. Switch to the `Dev` branch.
3. Create a feature branch from `Dev` for your task.
4. Commit your changes with clear commit messages.
5. Push your feature branch to GitHub.
6. Create a Pull Request to merge into `Dev`.
7. After testing and approval, merge `Dev` into `main`.

This workflow helps the team collaborate safely and keeps the `main` branch stable.

## Contributors

* Faolan
* Samuel 
* Max

Final Year Project – Group 2

