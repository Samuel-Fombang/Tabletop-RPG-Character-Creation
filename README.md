# 🎲 Tabletop RPG Character Creation App

A modern full-stack web application designed for tabletop role-playing game (TTRPG) enthusiasts to build, calculate, and manage character sheets easily using C#, React and MongoDB.

---

## 🛠️ Tech Stack & Architecture

* **Backend:** C# / .NET 10 Web API
* **Architecture:** Controller-Repository Pattern with Dependency Injection
* **Testing:** xUnit Automated Test Suite
* **API Documentation:** OpenAPI / Swagger UI
* **Frontend (Planned):** React / Vite

---

## 🚀 Key Features (Backend)

* **Automatic Stat Calculation:** Automatically computes core derived attributes upon character submission:
  * **Hit Points (HP):** $(\text{Constitution} \times 10) + (\text{Level} \times 5)$
  * **Action Points (AP):** $2 + \lfloor \text{Dexterity} / 2 \rfloor$
  * **Initiative:** $\text{Dexterity} + \text{Mind}$
* **In-Memory & Repository Layer:** Built with the Repository Pattern (`ICharacterRepository`). Runs seamlessly in-memory for local development with optional MongoDB integration support.
* **CORS Ready:** Pre-configured for seamless connection with React/Vite development servers (`http://localhost:5173`).
* **Interactive API Testing:** Embedded Swagger UI for quick manual testing of all API contracts.

---

## 📂 Project Structure

```text
Tabletop-RPG-Character-Creation/
├── backend/
│   ├── TabletopRPG.API/
│   │   ├── Controllers/
│   │   │   └── CharacterController.cs    # REST API endpoints (GET, POST)
│   │   ├── Models/
│   │   │   └── Character.cs              # Character entity & stat calculation engine
│   │   ├── Repositories/
│   │   │   ├── ICharacterRepository.cs   # Repository interface
│   │   │   ├── InMemoryCharacterRepository.cs # In-memory storage implementation
│   │   │   └── MongoCharacterRepository.cs    # MongoDB storage implementation
│   │   ├── Program.cs                    # Application startup, CORS & DI configuration
│   │   └── appsettings.json              # Configuration file
│   │
│   └── TabletopRPG.Tests/
│       └── CharacterTests.cs             # xUnit automated tests for stat formulas
└── README.md

---

## 💻 Getting Started Locally

### Prerequisites

* [.NET 10 SDK](https://dotnet.microsoft.com/download) (or .NET 8/9 equivalent)
* An API testing tool (e.g., Browser, Postman, or Swagger UI)

### Running the API

1. **Clone the repository:**
```bash
git clone [https://github.com/your-org/Tabletop-RPG-Character-Creation.git](https://github.com/your-org/Tabletop-RPG-Character-Creation.git)
cd Tabletop-RPG-Character-Creation

2. **Navigate to the API directory and run the application:**
```bash
cd backend/TabletopRPG.API
dotnet run

3. **Access Swagger UI:**
Open your browser and navigate to:
👉 `http://localhost:5280/swagger`

---

## 🧪 Running Unit Tests

To execute the automated xUnit test suite and verify calculation logic:

```bash
# Run from the root directory or backend directory
dotnet test

```

---

## 📡 API Reference

### 1. Calculate & Save Character

* **Endpoint:** `POST /api/character/calculate`
* **Headers:** `Content-Type: application/json`

**Sample Request Body:**

```json
{
  "name": "Kaelen",
  "nickname": "The Brave",
  "title": "Wanderer",
  "age": 28,
  "primaryRace": "Human",
  "characterLevel": 1,
  "strength": 12,
  "dexterity": 14,
  "constitution": 15,
  "mind": 10,
  "attunement": 8
}

```

**Sample Response (HTTP 200 OK):**

```json
{
  "id": "c1f7b822-491a-4c28-98e3-a123456789ab",
  "name": "Kaelen",
  "nickname": "The Brave",
  "title": "Wanderer",
  "age": 28,
  "primaryRace": "Human",
  "characterLevel": 1,
  "strength": 12,
  "dexterity": 14,
  "constitution": 15,
  "mind": 10,
  "attunement": 8,
  "maxHp": 155,
  "currentHp": 155,
  "actionPoints": 9,
  "initiative": 24
}

```

### 2. Get All Characters

* **Endpoint:** `GET /api/character`
* **Response:** Returns an array of all created character objects.