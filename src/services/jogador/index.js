import { api } from "../../../services/api";

export async function serviceCadastrarJogador(id, request) {
  const { status } = await api.post(`/api/sala/${id}/jogador`, request);
  return status === 200;
}
