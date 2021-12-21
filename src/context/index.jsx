import React, { useState, createContext, useContext, useEffect } from "react";
import { buscarSalas } from "../services/salas";
import { useHistory, useLocation } from "react-router-dom";

export const PokerContext = createContext();

//TODO Trocar nome para PokerContext

const RoomsProvider = ({ children }) => {
  const [salas, setSalas] = useState([]);
  const [administrador, setAdministrador] = useState({ nome: "", email: "" });
  const [jogador, setJogador] = useState({ nome: "", email: "" });
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [usuario, setUsuario] = useState({ nome: "", email: "" });
  const history = useHistory();
  const location = useLocation();
  const [sala, setSala] = useState({
    nome: "",
    metodologias: { cartas: [] },
    jogadores: [],
    historias: [],
  });

  function limparContexto() {
    setSala({
      nome: "",
      metodologias: { cartas: [] },
      jogadores: [],
      historias: [],
    });
    setTipoUsuario();
    setJogador({ nome: "", email: "" });
    setAdministrador({ nome: "", email: "" });
    setUsuario({ nome: "", email: "" });
  }

  useEffect(async () => {
    if (!location.pathname.includes("/jogador")) {
      if (!localStorage.getItem("tipoUsuario")) {
        history.push("/login");
      } else {
        if (localStorage.getItem("tipoUsuario") == "administrador") {
          setTipoUsuario("administrador");
          setAdministrador(JSON.parse(localStorage.getItem("administrador")));
          setUsuario(JSON.parse(localStorage.getItem("administrador")));
        } else {
          setTipoUsuario("jogador");
          setJogador(JSON.parse(localStorage.getItem("jogador")));
          setUsuario(JSON.parse(localStorage.getItem("jogador")));
        }
      }
    }
  }, []);

  const states = { administrador, jogador, salas, sala, tipoUsuario, usuario };

  const actions = {
    setAdministrador,
    setJogador,
    setSala,
    setSalas,
    setTipoUsuario,
    limparContexto,
  };

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
