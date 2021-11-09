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
import Login from "./pages/login";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/salas">
          <Salas />
        </Route>
        <Route exact path="/sala/:id">
          <Sala />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

//ANCHOR   Conversar com o Vini para ver se ele consegue alterar como ficam as histórias fechadas e abertas, colocando as duas nesse modelo de estrutura de dados
//
//
//
////const historias = {
//historiasAbertas : [], -> Aberta para ser Votada
//historiasFechadas : [] -> Votada
//}
