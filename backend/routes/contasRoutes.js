const express = require("express");
const router = express.Router();
const contasController = require("../controllers/contasController");
const auth = require("../utils/authMiddleware");

router.get("/", auth, contasController.listar);
router.get("/:id", auth, contasController.buscarPorId);
router.post("/", auth, contasController.inserir);
router.put("/:id", auth, contasController.atualizar);
router.delete("/:id", auth, contasController.remover);

module.exports = router;
