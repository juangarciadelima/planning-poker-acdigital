import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./pages/home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import CardRoom from "./pages/cardRoom";
import React, { useEffect, useContext } from "react";
import LoginScreen from "./pages/loginScreen/loginScreen";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <LoginScreen />
        </Route>
        <Route exact path="/home">
          <div>
            <Home />
          </div>
        </Route>
        <Route exact path="/room">
          <CardRoom />
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
