import React, { useState, createContext, useContext, useEffect } from "react";
import { buscarSalas } from "../services/salas";
import { useHistory } from "react-router-dom";

export const PokerContext = createContext();

//TODO Trocar nome para PokerContext

const RoomsProvider = ({ children }) => {
  const [salas, setSalas] = useState([]);
  const [administrador, setAdministrador] = useState({ nome: "", email: "" });
  const [jogador, setJogador] = useState({ nome: "", email: "" });
  const history = useHistory();
  const [sala, setSala] = useState({
    nome: "",
    metodologias: { cartas: [] },
    jogadores: [],
    historias: [],
  });

  useEffect(async () => {
    if (!localStorage.getItem("administrador")) {
      history.push("/login");
    } else {
      setAdministrador(JSON.parse(localStorage.getItem("administrador")));
    }
  }, []);

  const states = { administrador, jogador, salas, sala };

  const actions = { setAdministrador, setJogador, setSala, setSalas };

  return (
    <>
      <PokerContext.Provider value={{ ...states, ...actions }}>
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
