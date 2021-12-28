import React, { useState, createContext, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { buscarHistorias, serviceBuscarHistoria } from "../services/historias";
import { serviceBuscarSala } from "../services/salas";
import {
  serviceReiniciarVotacao,
  serviceFinalizarVotacao,
} from "../services/historias";
import poll from "easy-polling";
import { toast } from "react-toastify";

export const PokerContext = createContext();

const RoomsProvider = ({ children }) => {
  const [salas, setSalas] = useState([]);
  const [sala, setSala] = useState();
  const [administrador, setAdministrador] = useState({ nome: "", email: "" });
  const [jogador, setJogador] = useState({ nome: "", email: "" });
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [usuario, setUsuario] = useState({ nome: "", email: "" });
  const [historiasAbertas, setHistoriasAbertas] = useState([]);
  const [historiasFechadas, setHistoriasFechadas] = useState([]);
  const [historiaSelecionada, setHistoriaSelecionada] = useState()
  const [listaJogadoresVotos, setListaJogadoresVotos] = useState([])

  const history = useHistory();
  const location = useLocation();

  function limparContexto() {
    setSalas([])
    setTipoUsuario("");
    setJogador({ nome: "", email: "" });
    setAdministrador({ nome: "", email: "" });
    setUsuario({ nome: "", email: "" });
    setSala();
    setHistoriaSelecionada()
    setListaJogadoresVotos([])
  }

  function setLoginInContext(usuario, tipoUsuario) {
    setTipoUsuario(tipoUsuario);
    setAdministrador(usuario);
    setUsuario(usuario);
  }

  function verificaTipoUsuarioNoStorage() {
    if (localStorage.getItem("tipoUsuario") == "administrador") {
      setLoginInContext(
        JSON.parse(localStorage.getItem("administrador")),
        "administrador"
      );
    } else {
      setLoginInContext(JSON.parse(localStorage.getItem("jogador")), "jogador");
    }
  }

  useEffect(() => {
    if (!location.pathname.includes("/jogador")) {
      if (!localStorage.getItem("tipoUsuario")) {
        history.push("/login");
      } else {
        verificaTipoUsuarioNoStorage();
      }
    }
  }, []);

  const executarPollingAtualizarSala = async (id) => {
    poll(
      async() => {
        const _sala = await serviceBuscarSala(id)
        await atualizarHistorias(id)
        return _sala
      },
      (_sala) => {
        setSala(_sala)
        setListaJogadoresVotos(_sala.jogadores)
        return sala
      },
      5000, 
      600000
    );
  };

  async function atualizarHistorias(idSala){
    if(idSala){
      const _historiasAbertas = await buscarHistorias(idSala, "true");
      const _historiasFechadas = await buscarHistorias(idSala, "false");
      if(_historiasAbertas){
        setHistoriasAbertas(_historiasAbertas);
        setHistoriasFechadas(_historiasFechadas);
        setHistoriaSelecionada(_historiasAbertas[0])
      }
    }
  }

  const reiniciarVotacaoHistoriaSelecionada = async () => {
    await serviceReiniciarVotacao(historiaSelecionada.id);
    toast.success("Votação reiniciada com sucesso");
  };

  const finalizarVotacaoHistoriaSelecionada = async () => {
    await serviceFinalizarVotacao(historiaSelecionada.id);
    toast.success("Votação finalizada com sucesso");
  };

  const states = { 
    administrador, 
    jogador, 
    salas, 
    sala, 
    tipoUsuario, 
    usuario, 
    historiasAbertas, 
    historiasFechadas, 
    historiaSelecionada,
    listaJogadoresVotos,
  };

  const actions = {
    setAdministrador,
    setJogador,
    setSala,
    setSalas,
    setTipoUsuario,
    limparContexto,
    setLoginInContext,
    setHistoriaSelecionada,
    setHistoriasAbertas,
    setHistoriasFechadas,
    executarPollingAtualizarSala,
    atualizarHistorias,
    reiniciarVotacaoHistoriaSelecionada,
    finalizarVotacaoHistoriaSelecionada,
    setListaJogadoresVotos,
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
