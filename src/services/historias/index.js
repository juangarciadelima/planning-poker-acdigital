import { api } from "../../api";

export async function serviceCriarHistoria(req) {
  const res = await api.post(`/historia`, req);
  return res.data;
}

export async function serviceBuscarHistoria(id) {
  const res = await api.get(`/historia/${id}`);
  return res.data;
}

export async function buscarHistorias(idSala, emAberto) {
  const res = await api.get(`/sala/${idSala}/historia/${emAberto}`);
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

export async function serviceReiniciarVotacao(id) {
  const { status } = await api.put(`/historia/${id}/reiniciar`);
  return status === 200;
}

export async function serviceFinalizarVotacao(id) {
  const { status } = await api.put(`/historia/${id}/finalizar`);
  return status === 200;
}

export async function votar(idHistoria, voto) {
  const { status } = await api.put(
    `/historia/${idHistoria}/votar`,
    voto
  );
  return status === 200;
}
