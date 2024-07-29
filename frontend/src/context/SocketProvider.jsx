// src/context/SocketContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const ENDPOINT = "https://chatter-boxie.onrender.com";

// eslint-disable-next-line react/prop-types
const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const SocketState = () => {
  return useContext(SocketContext);
};

export default SocketProvider;
