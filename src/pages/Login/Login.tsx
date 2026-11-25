import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isSubmitting, errorMessage, login, clearError } =
    useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearError();
    try {
      await login(username.trim(), password);
      navigate('/dashboard', { replace: true });
    } catch {
      return;
    }
  };

  return (
    <div className="login-page">
      <div className="login-panel">
        <div className="login-brand">
          <div className="logo-icon">P</div>
          <div>
            <h1>Planify</h1>
            <span>Central de monitoramento</span>
          </div>
        </div>

        <p className="handwritten login-note">Pequenos passos, grandes cuidados</p>

        <h2>Entrar na central</h2>
        <p className="login-subtitle">
          Acesse o painel para acompanhar emergências e atendimentos.
        </p>

        <form className="login-form" onSubmit={(event) => void handleSubmit(event)}>
          <label htmlFor="username">
            Usuário
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              required
            />
          </label>

          <label htmlFor="password">
            Senha
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••"
              required
            />
          </label>

          {errorMessage ? <p className="login-error">{errorMessage}</p> : null}

          <button type="submit" className="login-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
