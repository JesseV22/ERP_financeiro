import React, { useEffect, useState } from 'react';
import {
  getLancamentos,
  insertLancamento,
  updateLancamento,
  deleteLancamento,
  getContas
} from '../utils/api';

export default function LancamentosPage({ token, onVoltar }) {
  const [lancamentos, setLancamentos] = useState([]);
  const [contas, setContas] = useState([]);
  const [contaId, setContaId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [valor, setValor] = useState('');

  const [editando, setEditando] = useState(null);

  async function carregarTudo() {
    const [dadosContas, dadosLanc] = await Promise.all([
      getContas(token),
      getLancamentos(token),
    ]);
    setContas(dadosContas);
    setLancamentos(dadosLanc);
  }

  useEffect(() => {
    carregarTudo();
  }, []);

  async function adicionarLanc(e) {
    e.preventDefault();
    await insertLancamento(token, {
      conta_id: contaId,
      descricao,
      data_vencimento: dataVencimento,
      valor,
    });
    setDescricao('');
    setDataVencimento('');
    setValor('');
    carregarTudo();
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    await updateLancamento(token, editando.id, {
      descricao: editando.descricao,
      data_vencimento: editando.data_vencimento,
      valor: editando.valor,
    });
    setEditando(null);
    carregarTudo();
  }

  async function excluirLanc(id) {
    const confirm = window.confirm('Deseja excluir este lançamento?');
    if (!confirm) return;
    await deleteLancamento(token, id);
    carregarTudo();
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary">📄 Lançamentos</h3>
        <button onClick={onVoltar} className="btn btn-outline-secondary">
          ← Voltar
        </button>
      </div>

      <form onSubmit={adicionarLanc} className="card p-3 shadow-sm mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <select
              className="form-select"
              value={contaId}
              onChange={(e) => setContaId(e.target.value)}
            >
              <option value="">Conta...</option>
              {contas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <input
              placeholder="Descrição"
              className="form-control"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={dataVencimento}
              onChange={(e) => setDataVencimento(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              placeholder="Valor"
              className="form-control"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
          <div className="col-md-1 d-grid">
            <button className="btn btn-success">➕</button>
          </div>
        </div>
      </form>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>Conta</th>
                <th>Descrição</th>
                <th>Vencimento</th>
                <th>Valor</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {lancamentos.map((l) => (
                <tr key={l.id}>
                  <td>{l.conta_id}</td>
                  <td>{l.descricao}</td>
                  <td>{l.data_vencimento?.substring(0, 10)}</td>
                  <td>R$ {parseFloat(l.valor).toFixed(2)}</td>
                  <td className="text-center">
                    <button
                      onClick={() => setEditando(l)}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => excluirLanc(l.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              {lancamentos.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    Nenhum lançamento cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Edição */}
      {editando && (
        <div
          className="modal fade show d-block"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Editar Lançamento</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setEditando(null)}
                ></button>
              </div>
              <form onSubmit={salvarEdicao}>
                <div className="modal-body">
                  <div className="mb-2">
                    <input
                      className="form-control"
                      value={editando.descricao}
                      onChange={(e) =>
                        setEditando({ ...editando, descricao: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="date"
                      className="form-control"
                      value={editando.data_vencimento?.substring(0, 10)}
                      onChange={(e) =>
                        setEditando({
                          ...editando,
                          data_vencimento: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      className="form-control"
                      value={editando.valor}
                      onChange={(e) =>
                        setEditando({ ...editando, valor: e.target.value })
                      }
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
                  <button className="btn btn-success">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
