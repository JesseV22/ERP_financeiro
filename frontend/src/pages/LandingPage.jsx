import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';

export default function LandingPage({ onContas, onLancamentos, onHome }) {
  return (
    <div className="landing-page">
      <NavBar onHome={onHome} onContas={onContas} onLancamentos={onLancamentos} />
      <main>
        <Hero />
        <section className="features container">
          <div className="feature-card">
            <h3>Visão clara</h3>
            <p>Resumo de saldos e movimentações com um visual direto ao ponto.</p>
          </div>
          <div className="feature-card">
            <h3>Seguro</h3>
            <p>Autenticação JWT e boas práticas de segurança no back-end.</p>
          </div>
          <div className="feature-card">
            <h3>Rápido</h3>
            <p>Carregamento otimizado, foco em performance para navegar rápido.</p>
          </div>
        </section>

        <section className="showcase container">
          <div className="showcase-left">
            <h2>Sua contabilidade sem complicação</h2>
            <p>
              Crie, edite e controle contas e lançamentos em um painel moderno e responsivo.
            </p>
            <div className="hero-ctas">
              <button className="btn-primary">Abrir o app</button>
              <button className="btn-ghost">Documentação</button>
            </div>
          </div>
          <div className="showcase-right">
            <div className="card-mock">
              <div className="card-title">Contas</div>
              <div className="card-body">
                <div className="row">
                  <div className="col">Conta A</div>
                  <div className="col text-right">R$ 1.200,00</div>
                </div>
                <div className="row muted">Vencimentos nesta semana</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-apple">
        <div className="container">
          <div>© {new Date().getFullYear()} MeuApp. Desenvolvido por Jessé.</div>
          <div className="muted">IFSP - Trabalho DW3</div>
        </div>
      </footer>
    </div>
  );
}
