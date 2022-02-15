import { api } from "../../api";

export async function buscarCartas() {
  const response = await api.get("/metodologia");
  return response.data;
}

export async function buscarMetodologiaPorId(id) {
  const response = await api.get(`/metodologia/${id}`);
  return response.data;
}
