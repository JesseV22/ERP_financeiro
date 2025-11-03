const Conta = require("../models/contasModel");

module.exports = {
  async listar(req, res) {
    res.send(await Conta.listar());
  },
  async buscarPorId(req, res) {
    const conta = await Conta.buscarPorId(req.params.id);
    if (!conta) return res.status(404).send({ error: "Conta não encontrada" });
    res.send(conta);
  },
  async inserir(req, res) {
    const [id] = await Conta.inserir(req.body);
    res.send({ id });
  },
  async atualizar(req, res) {
    await Conta.atualizar(req.params.id, req.body);
    res.send({ ok: true });
  },
  async remover(req, res) {
    await Conta.remover(req.params.id);
    res.send({ ok: true });
  }
};
