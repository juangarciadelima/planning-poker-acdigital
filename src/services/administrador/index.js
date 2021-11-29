import { api } from "../../api";

export async function login(req) {
  const res = await api.post("/administrador", req);
  localStorage.setItem("user", JSON.stringify(res.data));

  return res.data;
}

export async function logout(setUsuario) {
  localStorage.removeItem("user");
  setUsuario({ nome: "", email: "" });
}
