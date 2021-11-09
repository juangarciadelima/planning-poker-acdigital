import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/provider";
import RoomsProvider from "./context/index";

ReactDOM.render(
  <React.StrictMode>
    <RoomsProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </RoomsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//ANCHOR Adicionar lógica de passar os dados via Link (Componente do React-Router-Dom)
