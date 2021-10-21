import { api } from "../../api";

export async function createHistory(req) {
  const res = await api.post("/api/historia/nova", req);

  return res.data;
}

export async function getOpenHistory() {
  const res = await api.get("/api/historia/aberta");
  return res.data;
}

export async function getClosedHistory() {
  const res = await api.get("/api/historia/fechado");
  return res.data;
}

export function deleteHistory(id) {
  api.delete("/api/historia", id);
}

export function attHistory(req) {
  const res = api.patch("/api/historia", req);
  return res.data;
}

export function endHistory(id) {
  api.get(`/api/historia/finalizar/${id}`);
}

export function voteHistory(req) {
  const res = api.post("/api/historia/votar", req);
  return res.data;
}
