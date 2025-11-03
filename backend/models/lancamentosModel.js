const knex = require("../db/knex");

module.exports = {
  listar: () => knex("lancamentos").where({ removido: false }),
  buscarPorId: (id) =>
    knex("lancamentos").where({ id, removido: false }).first(),
  inserir: (data) =>
    knex("lancamentos").insert(data).returning("id"),
  atualizar: (id, data) =>
    knex("lancamentos")
      .where({ id })
      .update({ ...data, atualizado_em: knex.fn.now() }),
  remover: (id) =>
    knex("lancamentos")
      .where({ id })
      .update({ removido: true, removido_em: knex.fn.now() }),
};
