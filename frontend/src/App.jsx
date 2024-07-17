import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  return (
    <div className="app">
      <Route exact path="/" component={HomePage}></Route>
      <Route path="/chats" component={ChatPage}></Route>
    </div>
  );
};

export default App;
