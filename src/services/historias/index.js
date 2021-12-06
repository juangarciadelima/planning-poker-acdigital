import { api } from "../../api";

export async function serviceCriarHistoria(req) {
  const res = await api.post(`/historia`, req);

  return res.data;
}

export async function buscarHistoriaAberta(id, state) {
  const res = await api.get(`/sala/${id}/historia/${state}`);
  return res.data;
}

export async function buscarHistoriaFechada() {
  const res = await api.get("/api/historia/fechado");
  return res.data;
}

export function deletarHistoria(id) {
  api.delete("/api/historia", id);
}

export function serviceAtualizarHistoria(req) {
  const { status } = api.put("/historia", req);
  return status === 200;
}

export function fecharHistoria(id) {
  api.get(`/api/historia/finalizar/${id}`);
}

export function votar(req) {
  const res = api.post("/api/historia/votar", req);
  return res.data;
}
