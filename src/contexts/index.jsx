import React, { useState, createContext, useContext, useEffect } from "react";
import { getRooms } from "../services/rooms";

export const PokerContext = createContext();

//TODO Trocar nome para PokerContext

const RoomsProvider = ({ children }) => {
  const [salas, setSalas] = useState([]);
  const [usuario, setUsuario] = useState({ nome: "", email: "" });
  const [sala, setSala] = useState({
    nome: "",
    metodologias: { cartas: [] },
    jogadores: [],
    historias: [],
  });

  useEffect(async () => {
    const res = await getRooms();
    setSalas(res);
  }, []);
  console.log(sala);

  const crudSala = { salas };

  const administrador = { usuario, setUsuario };

  const voteSala = { sala, setSala };

  return (
    <>
      <PokerContext.Provider
        value={{ ...crudSala, ...administrador, ...voteSala }}
      >
        {children}
      </PokerContext.Provider>
    </>
  );
};

export const useRoomsContext = () => {
  const context = useContext(PokerContext);
  return context;
};

export default RoomsProvider;
