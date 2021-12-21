import { api } from "../../api";

export async function serviceCadastrarJogador(id, request) {
  const response = await api.put(`/sala/${id}/jogador`, request);
  localStorage.setItem("jogador", JSON.stringify(response.data.jogadores));
  localStorage.setItem("tipoUsuario", "jogador");
  return response.data;
}

export async function serviceDeslogarJogador(setJogador) {
  localStorage.clear();
  setJogador({ nome: "", email: "" });
}
