import React, { useState, createContext, useContext, useEffect } from "react";
import { getRooms } from "../services/rooms";

export const RoomsContext = createContext();

//TODO Trocar nome para PokerContext

const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState({ nome: "", email: "" });
  const [room, setRoom] = useState(null);

  useEffect(async () => {
    const res = await getRooms();
    setRooms(res);
  }, []);

  const crudSala = { rooms };

  const administrador = { user, setUser };

  const voteSala = { room, setRoom };

  return (
    <>
      <RoomsContext.Provider
        value={{ ...crudSala, ...administrador, ...voteSala }}
      >
        {children}
      </RoomsContext.Provider>
    </>
  );
};

export const useRoomsContext = () => {
  const context = useContext(RoomsContext);
  return context;
};

export default RoomsProvider;
