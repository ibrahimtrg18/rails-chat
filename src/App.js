import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import RoomIdPage from "./pages/RoomIdPage";
import LoginPage from "./pages/LoginPage";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/rooms/:roomId" element={<RoomIdPage />} />
          <Route path="/rooms" element={<RoomPage />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
