import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Atendimento } from '../types/atendimento';
import type { Chamado } from '../types/chamado';
import type { Usuario } from '../types/usuario';
import {
  assumeChamado,
  fetchAtendimentos,
  fetchChamados,
  fetchDashboardSummary,
  fetchUsuarios,
  resolveChamado,
  type DashboardSummary,
} from '../services/api';
import { useAuth } from './AuthContext';

interface ChamadosContextData {
  chamados: Chamado[];
  atendimentos: Atendimento[];
  usuarios: Usuario[];
  dashboard: DashboardSummary;
  isLoading: boolean;
  errorMessage: string | null;
  refreshAll: () => Promise<void>;
  assumirAtendimento: (id: number) => Promise<void>;
  finalizarAtendimento: (id: number) => Promise<void>;
}

const emptyDashboard: DashboardSummary = {
  stats: [],
  alerts: [],
  ticketsByDay: [],
  statusSlices: [],
  activity: [],
};

const ChamadosContext = createContext<ChamadosContextData | undefined>(
  undefined
);

export function ChamadosProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refreshAll = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    try {
      setErrorMessage(null);
      const [nextChamados, nextAtendimentos, nextUsuarios, nextDashboard] =
        await Promise.all([
          fetchChamados(),
          fetchAtendimentos(),
          fetchUsuarios(),
          fetchDashboardSummary(),
        ]);
      setChamados(nextChamados);
      setAtendimentos(nextAtendimentos);
      setUsuarios(nextUsuarios);
      setDashboard(nextDashboard);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar os dados da central.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setChamados([]);
      setAtendimentos([]);
      setUsuarios([]);
      setDashboard(null);
      setIsLoading(false);
      return;
    }
    void refreshAll();
    const timer = window.setInterval(() => {
      void refreshAll();
    }, 10000);
    return () => window.clearInterval(timer);
  }, [isAuthenticated, refreshAll]);

  const assumirAtendimento = useCallback(
    async (id: number) => {
      await assumeChamado(id);
      await refreshAll();
    },
    [refreshAll]
  );

  const finalizarAtendimento = useCallback(
    async (id: number) => {
      await resolveChamado(id);
      await refreshAll();
    },
    [refreshAll]
  );

  const value = useMemo(
    () => ({
      chamados,
      atendimentos,
      usuarios,
      dashboard: dashboard ?? emptyDashboard,
      isLoading,
      errorMessage,
      refreshAll,
      assumirAtendimento,
      finalizarAtendimento,
    }),
    [
      chamados,
      atendimentos,
      usuarios,
      dashboard,
      isLoading,
      errorMessage,
      refreshAll,
      assumirAtendimento,
      finalizarAtendimento,
    ]
  );

  return (
    <ChamadosContext.Provider value={value}>{children}</ChamadosContext.Provider>
  );
}

export function useChamados() {
  const context = useContext(ChamadosContext);

  if (!context) {
    throw new Error('useChamados deve ser usado dentro de ChamadosProvider');
  }

  return context;
}
