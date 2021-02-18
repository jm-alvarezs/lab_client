import { PruebasProvider } from "./context/PruebasContext";
import { ResultadosProvider } from "./context/ResultadosContext";
import { UserProvider } from "./context/UserContext";
import Main from "./views/Main";

function App() {
  return (
    <UserProvider>
      <PruebasProvider>
        <ResultadosProvider>
          <Main />
        </ResultadosProvider>
      </PruebasProvider>
    </UserProvider>
  );
}

export default App;
