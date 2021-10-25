import { api } from "../../../api";
export async function login(req) {
  const res = await api.post("/api/administrador", req);
  sessionStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
}

export async function logout(setUsuario) {
  localStorage.removeItem("user");
  setUsuario({ nome: "", email: "" });
}
