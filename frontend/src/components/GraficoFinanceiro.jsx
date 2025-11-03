import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { getLancamentos } from "../utils/api";

export default function GraficoFinanceiro({ token }) {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const lancamentos = await getLancamentos(token);

        // Agrupa lançamentos por mês e tipo
        const agrupado = {};
        lancamentos.forEach((item) => {
          const mes = new Date(item.data_vencimento).toLocaleString("pt-BR", {
            month: "short",
          });
          if (!agrupado[mes]) agrupado[mes] = { mes, entradas: 0, saidas: 0 };
          if (item.valor >= 0) agrupado[mes].entradas += item.valor;
          else agrupado[mes].saidas += Math.abs(item.valor);
        });

        setDados(Object.values(agrupado));
      } catch (e) {
        console.error("Erro ao gerar gráfico", e);
      }
    }
    carregarDados();
  }, [token]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h5 style={{ textAlign: "center", marginBottom: "10px", color: "#1e4dd8" }}>
        📈 Fluxo Financeiro (Entradas x Saídas)
      </h5>
      <ResponsiveContainer>
        <BarChart data={dados} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entradas" fill="#3a7bfa" name="Entradas" />
          <Bar dataKey="saidas" fill="#ff7676" name="Saídas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
