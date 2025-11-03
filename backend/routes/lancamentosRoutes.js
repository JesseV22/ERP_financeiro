const express = require("express");
const router = express.Router();
const lancamentosController = require("../controllers/lancamentosController");
const auth = require("../utils/authMiddleware");

// ✅ Todas as funções vêm do controller
router.get("/", auth, lancamentosController.listar);
router.get("/:id", auth, lancamentosController.buscarPorId);
router.post("/", auth, lancamentosController.inserir);
router.put("/:id", auth, lancamentosController.atualizar);  // 👈 ESTA LINHA ESTÁ DANDO O ERRO
router.delete("/:id", auth, lancamentosController.remover);

module.exports = router;
