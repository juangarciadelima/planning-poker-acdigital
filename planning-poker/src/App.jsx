import Footer from "./components/footer/";
import Header from "./components/header/";
import Home from "./components/pages/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CardRoom from "./pages/cardRoom";
import React from "react";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
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
