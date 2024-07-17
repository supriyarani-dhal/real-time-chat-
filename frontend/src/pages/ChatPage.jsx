import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer.jsx";
import { Box } from "@chakra-ui/react";
import MyChats from "../components/cards/MyChats.jsx";
import ChatBox from "../components/cards/ChatBox.jsx";
import { useState } from "react";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer></SideDrawer>}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        w={"100%"}
        h={"91.5vh"}
        p={"10px"}
      >
        {user && <MyChats fetchAgain={fetchAgain}></MyChats>}
        {user && (
          <ChatBox
            fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
          ></ChatBox>
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
