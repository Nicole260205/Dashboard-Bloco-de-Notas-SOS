import type { Atendimento } from '../types/atendimento';
import type { Chamado } from '../types/chamado';
import type { Usuario } from '../types/usuario';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:5000';

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  hint: string;
  tone: 'neutral' | 'danger' | 'warning' | 'success';
}

export interface DashboardAlert {
  id: number;
  nome: string;
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
  status: 'NOVO' | 'EM_ATENDIMENTO' | 'RESOLVIDO';
  horario: string;
  cidade: string;
}

export interface StatusSlice {
  label: string;
  value: number;
  percent: number;
  tone: 'new' | 'progress' | 'done';
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  time: string;
}

export interface TicketsByDayPoint {
  date: string;
  label: string;
  total: number;
  alta: number;
  media: number;
  baixa: number;
  novos: number;
  emAtendimento: number;
  resolvidos: number;
}

export interface DashboardSummary {
  stats: DashboardStat[];
  alerts: DashboardAlert[];
  ticketsByDay: TicketsByDayPoint[];
  statusSlices: StatusSlice[];
  activity: ActivityItem[];
}

export interface AuthUser {
  id: number;
  username: string;
  fullName: string;
  onboardingCompleted: boolean;
  usageType: string | null;
  mainFocus: string | null;
}

export interface LoginResponse {
  token: string;
  usuario: AuthUser;
  mensagem: string;
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.mensagem || 'Erro ao comunicar com a API.');
  }
  return data as T;
}

export async function loginRequest(
  username: string,
  password: string
): Promise<LoginResponse> {
  const data = await requestJson<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  return data;
}

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const data = await requestJson<DashboardSummary & { mensagem: string }>(
    '/api/emergency/dashboard'
  );
  return {
    stats: data.stats,
    alerts: data.alerts,
    ticketsByDay: data.ticketsByDay ?? [],
    statusSlices: data.statusSlices,
    activity: data.activity,
  };
}

export async function fetchChamados(): Promise<Chamado[]> {
  const data = await requestJson<{ chamados: Chamado[] }>(
    '/api/emergency/tickets'
  );
  return data.chamados;
}

export async function fetchAtendimentos(): Promise<Atendimento[]> {
  const data = await requestJson<{ atendimentos: Atendimento[] }>(
    '/api/emergency/attendances'
  );
  return data.atendimentos;
}

export async function fetchUsuarios(): Promise<Usuario[]> {
  const data = await requestJson<{ usuarios: Usuario[] }>(
    '/api/emergency/users'
  );
  return data.usuarios;
}

export async function assumeChamado(
  id: number,
  responsavel = 'Atendente atual'
): Promise<Chamado> {
  const data = await requestJson<{ chamado: Chamado }>(
    `/api/emergency/tickets/${id}/assume`,
    {
      method: 'POST',
      body: JSON.stringify({ responsavel }),
    }
  );
  return data.chamado;
}

export async function resolveChamado(id: number): Promise<Chamado> {
  const data = await requestJson<{ chamado: Chamado }>(
    `/api/emergency/tickets/${id}/resolve`,
    {
      method: 'POST',
    }
  );
  return data.chamado;
}
