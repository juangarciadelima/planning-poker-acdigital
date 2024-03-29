import React from "react";
import Header from "./components/Header";
import Salas from "./pages/salas";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sala from "./pages/sala";
import Cadastrar from "./pages/cadastro";
import SalaJogador from "./pages/jogador";
import { Login } from "./pages/login";
import RoomsProvider from "./context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <RoomsProvider>
          <Header />
          <Route exact path="/cadastra">
            <Cadastrar />
          </Route>
          <Route exact path="/">
            <Salas />
          </Route>
          <Route exact path="/sala/:id">
            <Sala />
          </Route>
          <Route exact path="/sala/:id/jogador">
            <SalaJogador />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </RoomsProvider>
      </Switch>
      {/* <Footer /> */}
      <ToastContainer />
    </Router>
  );
}
