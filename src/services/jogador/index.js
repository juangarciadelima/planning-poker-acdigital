import { api } from "../../api";

export async function serviceCadastrarJogador(id, jogador) {
  const response = await api.put(`/sala/${id}/jogador`, jogador);
  localStorage.setItem("jogador", JSON.stringify(jogador));
  localStorage.setItem("tipoUsuario", "jogador");
  return response.data;
}

export async function serviceDeslogarJogador() {
  localStorage.clear();
}
