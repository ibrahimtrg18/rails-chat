import Chat from "./Chat";
import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Chat />
    </AuthContextProvider>
  );
}

export default App;
