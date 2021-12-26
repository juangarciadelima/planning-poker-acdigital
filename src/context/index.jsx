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
    setSalas([])
    setTipoUsuario("");
    setJogador({ nome: "", email: "" });
    setAdministrador({ nome: "", email: "" });
    setUsuario({ nome: "", email: "" });
  }

  function setLoginInContext(usuario, tipoUsuario){
    setTipoUsuario(tipoUsuario);
    setAdministrador(usuario);
    setUsuario(usuario);
  }

  function verificaTipoUsuarioNoStorage(){
    if (localStorage.getItem("tipoUsuario") == "administrador") {
      setLoginInContext(JSON.parse(localStorage.getItem("administrador")), "administrador");
    } else {
      setLoginInContext(JSON.parse(localStorage.getItem("jogador")), "jogador");
    }
  }

  useEffect(() => {
    if (!location.pathname.includes("/jogador")) {
      if (!localStorage.getItem("tipoUsuario")) {
        history.push("/login");
      } else {
        verificaTipoUsuarioNoStorage()
      }
    }
  }, []);

  const states = { administrador, jogador, salas, sala, tipoUsuario, usuario };

  console.log("store", states)

  const actions = {
    setAdministrador,
    setJogador,
    setSala,
    setSalas,
    setTipoUsuario,
    limparContexto,
    setLoginInContext
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
