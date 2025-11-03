const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

// Rota para criar usuário admin
router.post("/criar-admin", usuariosController.criarAdmin);

// Rota para login
router.post("/login", usuariosController.login);

module.exports = router;
