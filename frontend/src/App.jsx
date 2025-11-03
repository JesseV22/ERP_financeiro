import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContasPage from './pages/ContasPage';
import LancamentosPage from './pages/LancamentosPage';

export default function App() {
  // token (string) ou null
  const [token, setToken] = useState(localStorage.getItem('token'));
  // página atual: 'dashboard' | 'contas' | 'lancamentos'
  const [page, setPage] = useState('dashboard');

  // handlers que passamos para NavBar
  function goHome() { setPage('dashboard'); }
  function goDashboard() { setPage('dashboard'); }
  function goContas() { setPage('contas'); }
  function goLancamentos() { setPage('lancamentos'); }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
    setPage('dashboard');  // This is good! Resets to dashboard
  }

  // Se não está logado, mostra a tela de login
  if (!token) {
    return (
      <div>
        <LoginPage onLogin={(t) => {
          // login deve retornar string token
          const tok = typeof t === 'string' ? t : (t.token || '');
          localStorage.setItem('token', tok);
          setToken(tok);
        }} />
      </div>
    );
  }

  // Layout com NavBar sempre visível
  return (
    <div>
      <NavBar
        onHome={goHome}
        onDashboard={goDashboard}
        onContas={goContas}
        onLancamentos={goLancamentos}
        onLogout={handleLogout}
      />

      {/* páginas */}
      {page === 'dashboard' && (
        <DashboardPage
          onContas={() => setPage('contas')}
          onLancamentos={() => setPage('lancamentos')}
          onLogout={handleLogout}
        />
      )}

      {page === 'contas' && (
        <ContasPage
          token={token}
          onVoltar={() => setPage('dashboard')}
          onLancamentos={() => setPage('lancamentos')}
          onLogout={handleLogout}
        />
      )}

      {page === 'lancamentos' && (
        <LancamentosPage
          token={token}
          onVoltar={() => setPage('dashboard')}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
