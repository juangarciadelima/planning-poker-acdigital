import { api } from "../../api";

export async function buscarCartas() {
  const response = await api.get("/api/metodologia");
  return response.data;
}
