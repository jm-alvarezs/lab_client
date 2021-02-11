import { PruebasProvider } from "./context/PruebasContext";
import { UserProvider } from "./context/UserContext";
import Main from "./views/Main";

function App() {
  return (
    <UserProvider>
      <PruebasProvider>
        <Main />
      </PruebasProvider>
    </UserProvider>
  );
}

export default App;
