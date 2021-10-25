import { api } from "../../api";

export async function getRooms() {
  const res = await api.get(
    "/api/sala/?administrador=jaderson.chefe@acdigital.com.br"
  );

  return res.data;
}

export async function enterRoom() {
  const res = await api.get(
    "/api/sala/?id=16ece314-9ee1-4c88-96e5-c696c9a346dd"
  );
  localStorage.setItem("room", JSON.stringify(res.data));
  return res.data;
}
