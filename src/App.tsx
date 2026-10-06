import AppRoutes from "./routes/AppRoutes";
import { ChamadosProvider } from "./contexts/ChamadosContext";

function App() {
  return (
    <ChamadosProvider>
      <AppRoutes />
    </ChamadosProvider>
  );
}

export default App;
