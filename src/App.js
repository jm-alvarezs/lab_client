import { ModalProvider } from "./context/ModalContext";
import { PruebasProvider } from "./context/PruebasContext";
import { ResultadosProvider } from "./context/ResultadosContext";
import { UserProvider } from "./context/UserContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import Main from "./views/Main";

function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <PruebasProvider>
          <ResultadosProvider>
            <UsuariosProvider>
              <Main />
            </UsuariosProvider>
          </ResultadosProvider>
        </PruebasProvider>
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
