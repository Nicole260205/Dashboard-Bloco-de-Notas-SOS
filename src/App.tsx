import { AuthProvider } from './contexts/AuthContext';
import { ChamadosProvider } from './contexts/ChamadosContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <ChamadosProvider>
        <AppRoutes />
      </ChamadosProvider>
    </AuthProvider>
  );
}

export default App;
