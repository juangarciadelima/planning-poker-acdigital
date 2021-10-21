import Footer from "./components/Footer/";
import Header from "./components/Header";
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
import { RoomsContext } from "./contexts";

export default function App() {
  const { user } = useContext(RoomsContext);

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

//Aqui deverei exibir um ternário para assim, definir se estou logado ou não, exibindo os componentes, ou só a página de login

// ANCHOR Trocar uma ideia com o vinizeira sobre como funcionará o body
