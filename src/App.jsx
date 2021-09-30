import Footer from "./components/Footer/";
import Header from "./components/Header";
import Home from "./pages/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CardRoom from "./pages/cardRoom";
import React from "react";
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
