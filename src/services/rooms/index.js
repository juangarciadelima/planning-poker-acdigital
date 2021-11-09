import { api } from "../../api";

export async function buscarSalas(administrador) {
  const res = await api.get(`/api/salas/${administrador}`);

  return res.data;
}

export async function entrarSala(id) {
  const res = await api.get(`/api/sala/${id}`);

  return res.data;
}

export async function criarSala(sala) {
  const res = await api.post("/api/sala", sala);

  return res.data;
}
