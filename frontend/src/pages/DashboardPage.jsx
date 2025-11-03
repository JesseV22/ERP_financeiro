import React, { useEffect, useState } from "react";
import { getLancamentos } from "../utils/api";
import GraficoFinanceiro from "../components/GraficoFinanceiro";

import { Wallet2, ArrowDownCircle, ArrowUpCircle } from "react-bootstrap-icons";
import "./dashboard.css";


export default function DashboardPage({ token }) {
  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    async function carregarDados() {
      try {
        const lancs = await getLancamentos(token);
        const totalEntradas = lancs
          .filter((l) => l.valor >= 0)
          .reduce((acc, cur) => acc + Number(cur.valor), 0);
        const totalSaidas = lancs
          .filter((l) => l.valor < 0)
          .reduce((acc, cur) => acc + Math.abs(cur.valor), 0);

        setEntradas(totalEntradas);
        setSaidas(totalSaidas);
        setSaldo(totalEntradas - totalSaidas);
      } catch (e) {
        console.error("Erro ao carregar dados:", e);
      }
    }
    carregarDados();
  }, [token]);

  return (
    <div className="dashboard-container">
      <h2 className="titulo">💰 Painel Financeiro</h2>
      <p className="subtitulo">Resumo geral das movimentações</p>

      <div className="cards-container">
        <div className="card-item saldo">
          <Wallet2 size={30} />
          <div>
            <h4>Saldo Atual</h4>
            <p>R$ {saldo.toFixed(2)}</p>
          </div>
        </div>

        <div className="card-item entrada">
          <ArrowUpCircle size={30} />
          <div>
            <h4>Entradas</h4>
            <p>R$ {entradas.toFixed(2)}</p>
          </div>
        </div>

        <div className="card-item saida">
          <ArrowDownCircle size={30} />
          <div>
            <h4>Saídas</h4>
            <p>R$ {saidas.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <GraficoFinanceiro token={token} />

      <footer className="footer">
        <p>Sistema desenvolvido por <b>Jessé</b> • DW3 - IFSP</p>
      </footer>
    </div>
  );
}
