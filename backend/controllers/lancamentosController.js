const Lancamento = require("../models/lancamentosModel");

module.exports = {
  async listar(req, res) {
    res.send(await Lancamento.listar());
  },

  async buscarPorId(req, res) {
    const item = await Lancamento.buscarPorId(req.params.id);
    if (!item)
      return res.status(404).send({ error: "Lançamento não encontrado" });
    res.send(item);
  },

  async inserir(req, res) {
    const { conta_id, descricao, data_vencimento, valor } = req.body;
    const [id] = await Lancamento.inserir({
      conta_id,
      descricao,
      data_vencimento,
      valor,
    });
    res.send({ id });
  },

  async atualizar(req, res) {
    const { descricao, valor, data_vencimento } = req.body;
    await Lancamento.atualizar(req.params.id, {
      descricao,
      valor,
      data_vencimento,
    });
    res.send({ ok: true });
  },

  async remover(req, res) {
    await Lancamento.remover(req.params.id);
    res.send({ ok: true });
  },
};
