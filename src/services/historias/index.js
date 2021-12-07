import { api } from "../../api";

export async function serviceCriarHistoria(req) {
  const res = await api.post(`/historia`, req);

  return res.data;
}

export async function buscarHistoriaAberta(id, state) {
  const res = await api.get(`/sala/${id}/historia/${state}`);
  return res.data;
}

export async function serviceDeletarHistoria(id) {
  const { status } = await api.delete(`/historia/${id}`, { id: id });
  return status === 200;
}

export async function serviceAtualizarHistoria(req) {
  const { status } = await api.put("/historia", req);

  return status === 200;
}
