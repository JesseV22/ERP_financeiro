const knex = require("../db/knex");

module.exports = {
  listar: () => knex("contas").where({ removido: false }),
  buscarPorId: (id) => knex("contas").where({ id, removido: false }).first(),
  inserir: (data) => knex("contas").insert(data).returning("id"),
  atualizar: (id, data) =>
    knex("contas").where({ id }).update({ ...data, atualizado_em: knex.fn.now() }),
  remover: (id) =>
    knex("contas").where({ id }).update({ removido: true, removido_em: knex.fn.now() }),
};
