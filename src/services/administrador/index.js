import { api } from "../../api";

export async function cadastrar(req) {
  const res = await api.post("/administrador", req);
  localStorage.setItem("user", JSON.stringify(res.data));

  return res.data;
}

export async function serviceLogin(administrador) {
  const response = await api.get(`/administrador/${administrador}`);
  localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
}

export async function logout(setUsuario) {
  localStorage.removeItem("user");
  setUsuario({ nome: "", email: "" });
}
