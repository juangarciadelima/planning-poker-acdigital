import { api } from "../../api";

export async function buscarSalas() {
  const res = await api.get("/api/sala/jaderson.chefe@acdigital.com.br");

  return res.data;
}

export async function entrarSala() {
  const res = await api.get("/api/sala/16ece314-9ee1-4c88-96e5-c696c9a346dd");
  localStorage.setItem("room", JSON.stringify(res.data));
  return res.data;
}
