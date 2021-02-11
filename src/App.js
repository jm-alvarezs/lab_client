import { UserProvider } from "./context/UserContext";
import Main from "./views/Main";

function App() {
  return (
    <UserProvider>
      <Main />
    </UserProvider>
  );
}

export default App;
