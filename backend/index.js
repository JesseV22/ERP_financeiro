require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());


const contasRoutes = require("./routes/contasRoutes");
const lancamentosRoutes = require("./routes/lancamentosRoutes");
const usuariosRoutes = require("./routes/usuariosRoutes");

app.use(express.json());

// Rotas protegidas
app.use("/api/contas", contasRoutes);
app.use("/api/lancamentos", lancamentosRoutes);

// Rotas públicas (login e criar-admin)
app.use("/api", usuariosRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
