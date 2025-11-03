import React, { useState } from "react";
import { HouseDoor, CreditCard, Wallet2, BoxArrowRight, List } from "react-bootstrap-icons";
import "./navbar.css";

export default function NavBar({ onHome, onDashboard, onContas, onLancamentos, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bank-navbar">
      <div className="bank-container">
        {/* LOGO */}
        <div className="bank-logo" onClick={onHome}>
          <div className="logo-icon">💰</div>
          <div className="logo-text">
            <h1>MeuBanco</h1>
            <span>Painel Financeiro</span>
          </div>
        </div>

        {/* MENU DESKTOP */}
        <nav className={`bank-links ${menuOpen ? "open" : ""}`}>
          <button onClick={onDashboard}>
            <HouseDoor size={18} /> Dashboard
          </button>
          <button onClick={onContas}>
            <CreditCard size={18} /> Contas
          </button>
          <button onClick={onLancamentos}>
            <Wallet2 size={18} /> Lançamentos
          </button>
          <button className="logout" onClick={onLogout}>
            <BoxArrowRight size={18} /> Sair
          </button>
        </nav>

        {/* BOTÃO MOBILE */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <List size={22} />
        </button>
      </div>
    </header>
  );
}
