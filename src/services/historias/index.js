import { api } from "../../api";

export async function criarHistoria(req) {
  const res = await api.post("/api/historia/nova", req);

  return res.data;
}

export async function buscarHistoriaAberta(id, state) {
  const res = await api.get(`/api/sala/${id}/historia/${state}`);
  return res.data;
}

export async function buscarHistoriaFechada() {
  const res = await api.get("/api/historia/fechado");
  return res.data;
}

export function deletarHistoria(id) {
  api.delete("/api/historia", id);
}

export function atualizarHistoria(req) {
  const res = api.patch("/api/historia", req);
  return res.data;
}

export function fecharHistoria(id) {
  api.get(`/api/historia/finalizar/${id}`);
}

export function votar(req) {
  const res = api.post("/api/historia/votar", req);
  return res.data;
}