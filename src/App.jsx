import React from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import Salas from "./pages/salas";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Sala from "./pages/sala";
import Cadastrar from "./pages/cadastro";
import SalaJogador from "./pages/jogador";
import { Login } from "./pages/login";
import RoomsProvider from "./context";

export default function App() {
  return (
    <Router>
      <Switch>
        <RoomsProvider>
          <Header />
          <Route exact path="/">
            <Cadastrar />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/salas">
            <Salas />
          </Route>
          <Route exact path="/sala/:id">
            <Sala />
          </Route>
          <Route exact path="/jogador">
            <SalaJogador />
          </Route>
        </RoomsProvider>
      </Switch>
      <Footer />
    </Router>
  );
}
