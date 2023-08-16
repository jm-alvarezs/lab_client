import { ModalProvider } from "./context/ModalContext";
import { ResultadosProvider } from "./context/ResultadosContext";
import { MultiTestProvider } from "./context/MultiTestContext";
import { PacientesProvider } from "./context/PacientesContext";
import { PaymentsProvider } from "./context/PaymentsContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import { TestTypeProvider } from "./context/TestTypeContext";
import { PruebasProvider } from "./context/PruebasContext";
import { SurveyProvider } from "./context/SurveyContext";
import { AuthProvider } from "./context/AuthContext";
import { combineComponents } from "./context";
import Main from "./views/Main";

const AppContextProvider = combineComponents([
  AuthProvider,
  SurveyProvider,
  PruebasProvider,
  PaymentsProvider,
  UsuariosProvider,
  TestTypeProvider,
  MultiTestProvider,
  PacientesProvider,
  ResultadosProvider,
]);

function App() {
  return (
    <ModalProvider>
      <AppContextProvider>
        <Main />
      </AppContextProvider>
    </ModalProvider>
  );
}

export default App;
