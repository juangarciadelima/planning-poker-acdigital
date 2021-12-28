import React, { useState, createContext, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { buscarHistorias, serviceFinalizarVotacao } from "../services/historias";
import { serviceAlterarSala, serviceBuscarSala } from "../services/salas";
import {
  serviceReiniciarVotacao
} from "../services/historias";
import poll from "easy-polling";
import { toast } from "react-toastify";

export const PokerContext = createContext();
const polling = { parar: false }

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
    polling.parar = true
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
    polling
  };

  const executarPollingAtualizarSala = async (id) => {
    poll(
      async() => await atualizarTodaSala(id),
      () => {
        return polling.parar
      },
      1000, 
      600000000000
    );
  };

  async function atualizarTodaSala(idSala){
    if(idSala){
      const _sala = await serviceBuscarSala(idSala)
      const _historiasAbertas = await buscarHistorias(idSala, "true");
      const _historiasFechadas = await buscarHistorias(idSala, "false");
      if(_sala){
        setSala(_sala)
        setListaJogadoresVotos(_sala.jogadores)
        setHistoriasAbertas(_historiasAbertas);
        setHistoriasFechadas(_historiasFechadas);
        if(_historiasAbertas.length > 0)
          setHistoriaSelecionada(_historiasAbertas[0])
      }
    }
  }

  const resetarVotacaoHistoriaSelecionada = async () => {
    setSala({ ...sala, ...{ revelarVotos: false }})
    let _sala = { ...sala, ...{ revelarVotos: false }}
    await serviceAlterarSala(_sala)
    await serviceReiniciarVotacao(historiaSelecionada.id);
    toast.success("Votação reiniciada com sucesso");
  };

  const revelarVotacaoHistoriaSelecionada = async () => {
    setSala({ ...sala, ...{ revelarVotos: true }})
    let _sala = { ...sala, ...{ revelarVotos: true }}
    await serviceAlterarSala(_sala)
    toast.success("Votos revelados");
  };

  const proximaHistoriaSelecionada = async (idSala) => {
    setSala({ revelarVotos: false })
    let _sala = { ...sala, ...{ revelarVotos: false }}
    await serviceAlterarSala(_sala)
    await serviceFinalizarVotacao(historiaSelecionada.id);
    await atualizarTodaSala(idSala)
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
    atualizarTodaSala,
    resetarVotacaoHistoriaSelecionada,
    revelarVotacaoHistoriaSelecionada,
    setListaJogadoresVotos,
    proximaHistoriaSelecionada
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