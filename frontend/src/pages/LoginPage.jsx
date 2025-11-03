import React, { useState } from "react";
import "./login.css";
import { login } from "../utils/api";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = await login(username, password);
      localStorage.setItem("token", token);
      onLogin(token);
    } catch {
      setErro("Usuário ou senha inválidos.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">💰</div>
          <h2>MeuBanco</h2>
          <p>Acesse sua conta</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {erro && <div className="error">{erro}</div>}

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>

        <p className="footer">
          Sistema financeiro acadêmico <br />
          <span>Desenvolvido por Jessé</span>
        </p>
      </div>
    </div>
  );
}
