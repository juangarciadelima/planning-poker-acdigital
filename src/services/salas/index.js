import { api } from "../../api";

export async function serviceBuscarSalas(administrador) {
  const res = await api.get(`/api/salas/${administrador}`);
  return res.data;
}

export async function serviceBuscarSala(id) {
  const res = await api.get(`/api/sala/${id}`);
  return res.data;
}

export async function serviceCriarSala(sala) {
  const { status } = await api.post("/api/sala", sala);
  return status === 200;
}

export async function serviceAlterarSala(sala) {
  const { status } = await api.put("/api/sala", sala);
  return status === 200;
}

export async function serviceDeletarSala(id) {
  const { status } = await api.delete("/api/sala", { id: id });
  return status === 200;
}
