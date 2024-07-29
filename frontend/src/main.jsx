import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./context/ChatProvider";
import SocketProvider from "./context/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <BrowserRouter>
      <ChatProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);
