import { api } from "../../api";

export async function serviceBuscarSalas(administrador) {
  const res = await api.get(`/administrador/${administrador}/salas`);
  return res.data;
}

export async function serviceBuscarSala(id) {
  const res = await api.get(`/sala/${id}`);
  return res.data;
}

export async function serviceCriarSala(sala) {
  const { status } = await api.post("/sala", sala);
  return status === 201;
}

export async function serviceAlterarSala(sala) {
  const { status } = await api.put("/sala", sala);
  return status === 200;
}

export async function serviceDeletarSala(id) {
  const { status } = await api.delete(`/sala/${id}`, { id: id });
  return status === 200;
}
