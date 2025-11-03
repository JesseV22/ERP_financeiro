const knex = require("../db/knex");
const bcrypt = require("bcryptjs");

module.exports = {
  async criarUsuario(username, password) {
    const existe = await knex("usuarios").where({ username }).first();
    if (existe) throw new Error("Usuário já existe");
    const hash = await bcrypt.hash(password, 10);
    return knex("usuarios").insert({ username, password: hash });
  },

  async buscarPorUsername(username) {
    return knex("usuarios").where({ username }).first();
  },
};
