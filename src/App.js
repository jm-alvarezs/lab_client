import { ModalProvider } from "./context/ModalContext";
import { MultiTestProvider } from "./context/MultiTestContext";
import { PacientesProvider } from "./context/PacientesContext";
import { PaymentsProvider } from "./context/PaymentsContext";
import { PruebasProvider } from "./context/PruebasContext";
import { ResultadosProvider } from "./context/ResultadosContext";
import { SurveyProvider } from "./context/SurveyContext";
import { TestTypeProvider } from "./context/TestTypeContext";
import { UserProvider } from "./context/UserContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import Main from "./views/Main";

function App() {
  return (
    <ModalProvider>
      <UserProvider>
        <PruebasProvider>
          <ResultadosProvider>
            <UsuariosProvider>
              <PacientesProvider>
                <SurveyProvider>
                  <TestTypeProvider>
                    <PaymentsProvider>
                      <MultiTestProvider>
                        <Main />
                      </MultiTestProvider>
                    </PaymentsProvider>
                  </TestTypeProvider>
                </SurveyProvider>
              </PacientesProvider>
            </UsuariosProvider>
          </ResultadosProvider>
        </PruebasProvider>
      </UserProvider>
    </ModalProvider>
  );
}

export default App;
