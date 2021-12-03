import { api } from "../../api";

export async function buscarCartas() {
  const response = await api.get("/metodologia");
  return response.data;
}
