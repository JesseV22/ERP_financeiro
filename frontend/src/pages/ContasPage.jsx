import React, { useEffect, useState } from "react";
import { getContas, addConta } from "../utils/api";

export default function ContasPage({ token, onLogout }) {
  const [contas, setContas] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [editando, setEditando] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [novaDescricao, setNovaDescricao] = useState("");

  async function carregarContas() {
    const data = await getContas(token);
    setContas(data);
  }

  useEffect(() => {
    carregarContas();
  }, []);

  async function adicionarConta(e) {
    e.preventDefault();
    if (!nome.trim()) return alert("Digite um nome");
    await addConta({ nome, descricao });
    setNome("");
    setDescricao("");
    carregarContas();
  }

  async function excluirConta(id) {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir esta conta?"
    );
    if (!confirm) return;
    await fetch(`http://localhost:4000/api/contas/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    carregarContas();
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    await fetch(`http://localhost:4000/api/contas/${editando.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome: novoNome, descricao: novaDescricao }),
    });
    setEditando(null);
    carregarContas();
  }

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">
            💰 Meu Sistema Financeiro
          </span>
          <button onClick={onLogout} className="btn btn-outline-light btn-sm">
            <i className="bi bi-box-arrow-right"></i> Sair
          </button>
        </div>
      </nav>

      <div className="container py-4">
        <div className="row g-4">
          {/* Card de Adição */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary mb-3">
                  <i className="bi bi-plus-circle"></i> Nova Conta
                </h5>
                <form onSubmit={adicionarConta}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Nome da conta"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Descrição"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-success w-100">
                    <i className="bi bi-check-circle"></i> Adicionar
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Lista de Contas */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary mb-3">
                  <i className="bi bi-list-ul"></i> Contas Cadastradas
                </h5>

                <div className="table-responsive">
                  <table className="table align-middle table-hover">
                    <thead className="table-primary">
                      <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th className="text-center">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contas.map((c) => (
                        <tr key={c.id}>
                          <td>{c.id}</td>
                          <td>{c.nome}</td>
                          <td>{c.descricao || "—"}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => {
                                setEditando(c);
                                setNovoNome(c.nome);
                                setNovaDescricao(c.descricao);
                              }}
                            >
                              <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => excluirConta(c.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {contas.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center text-muted">
                            Nenhuma conta cadastrada
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      {editando && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="bi bi-pencil"></i> Editar Conta
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setEditando(null)}
                ></button>
              </div>
              <form onSubmit={salvarEdicao}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      className="form-control"
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <input
                      className="form-control"
                      value={novaDescricao}
                      onChange={(e) => setNovaDescricao(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditando(null)}
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success">
                    <i className="bi bi-check2-circle"></i> Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
