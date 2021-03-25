import { PruebasProvider } from "./context/PruebasContext";
import { ResultadosProvider } from "./context/ResultadosContext";
import { UserProvider } from "./context/UserContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import Main from "./views/Main";

function App() {
  return (
    <UserProvider>
      <PruebasProvider>
        <ResultadosProvider>
          <UsuariosProvider>
            <Main />
          </UsuariosProvider>
        </ResultadosProvider>
      </PruebasProvider>
    </UserProvider>
  );
}

export default App;
