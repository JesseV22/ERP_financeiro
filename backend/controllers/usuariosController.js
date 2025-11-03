const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuariosModel");
require("dotenv").config();

module.exports = {
  // Criar admin (apenas uma vez)
  async criarAdmin(req, res) {
    try {
      const { username, password } = req.body;
      await Usuario.criarUsuario(username, password);
      res.send({ ok: true, msg: "Usuário admin criado com sucesso" });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  },

  // Login de usuário
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await Usuario.buscarPorUsername(username);
      if (!user) return res.status(401).send({ error: "Usuário não encontrado" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).send({ error: "Senha incorreta" });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      res.send({ token });
    } catch (err) {
      res.status(500).send({ error: "Erro interno no login" });
    }
  },
};
