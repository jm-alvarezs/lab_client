import { ModalProvider } from "./context/ModalContext";
import { PacientesProvider } from "./context/PacientesContext";
import { PruebasProvider } from "./context/PruebasContext";
import { ResultadosProvider } from "./context/ResultadosContext";
import { SurveyContext } from "./context/SurveyContext";
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
              <PacientesProvider>
                <SurveyContext>
                  <Main />
                </SurveyContext>
              </PacientesProvider>
            </UsuariosProvider>
          </ResultadosProvider>
        </PruebasProvider>
      </ModalProvider>
    </UserProvider>
  );
}

export default App;
