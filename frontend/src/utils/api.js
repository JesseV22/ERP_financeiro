const API_URL = "http://localhost:4000/api";

/* ======================
   FUNÇÕES DE CONTAS
====================== */
export async function getContas(token) {
  const res = await fetch(`${API_URL}/contas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar contas");
  return await res.json();
}

export async function getContaById(token, id) {
  const res = await fetch(`${API_URL}/contas/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar conta pelo ID");
  return await res.json();
}

export async function addConta(token, data) {
  const res = await fetch(`${API_URL}/contas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao adicionar conta");
  return await res.json();
}

// Compatibilidade: alias para quem importa `insertConta`
export async function insertConta(token, data) {
  return await addConta(token, data);
}

export async function updateConta(token, id, data) {
  const res = await fetch(`${API_URL}/contas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar conta");
  return await res.json();
}

export async function deleteConta(token, id) {
  const res = await fetch(`${API_URL}/contas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erro ao excluir conta");
  return await res.json();
}

/* ======================
   FUNÇÕES DE LANÇAMENTOS
====================== */
export async function getLancamentos(token) {
  const res = await fetch(`${API_URL}/lancamentos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erro ao buscar lançamentos");
  return await res.json();
}

export async function insertLancamento(token, data) {
  const res = await fetch(`${API_URL}/lancamentos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao inserir lançamento");
  return await res.json();
}

export async function updateLancamento(token, id, data) {
  const res = await fetch(`${API_URL}/lancamentos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar lançamento");
  return await res.json();
}

export async function deleteLancamento(token, id) {
  const res = await fetch(`${API_URL}/lancamentos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erro ao excluir lançamento");
  return await res.json();
}

/* ======================
   LOGIN
====================== */
export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Erro no login");
  const data = await res.json();
  return data.token;
}
