import { api } from "../../api";

export async function cadastrar(req) {
  const res = await api.post("/administrador", req);
  localStorage.setItem("administrador", JSON.stringify(res.data));
  localStorage.setItem("tipoUsuario", "administrador");

  return res.data;
}

export async function serviceLogin(administrador) {
  const response = await api.get(`/administrador/${administrador}`);
  localStorage.setItem("administrador", JSON.stringify(response.data));
  localStorage.setItem("tipoUsuario", "administrador");

  return response.data;
}

export async function logout() {
  localStorage.clear();
}
