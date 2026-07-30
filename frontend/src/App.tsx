import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import About from "./pages/About";
import CharacterCreationPage from "./pages/CharacterCreationPage";
import CharacterDashboard from "./pages/CharacterDashboard";
import CharacterDetails from "./pages/CharacterDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={<UserProfile />}
        />

        <Route
          path="/dashboard"
          element={<CharacterDashboard />}
        />

        <Route
          path="/character/create"
          element={<CharacterCreationPage />}
        />

        <Route
          path="/character/details/:id"
          element={<CharacterDetails />}
        />

        <Route path="/about" element={<About />} />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;