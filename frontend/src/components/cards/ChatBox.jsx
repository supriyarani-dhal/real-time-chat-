import { Box } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import SingleChat from "../layouts/SingleChat";

// eslint-disable-next-line react/prop-types
const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      w={{ base: "100%", md: "68%" }}
      borderRadius={"lg"}
      borderWidth={"1px"}
      borderColor={"rgba(255, 255, 255, 0.125)"}
      boxShadow={"md"}
      backgroundColor="rgba(74, 144, 226, 0.4)"
      backdropFilter={"blur(25px) saturate(200%)"}
      textColor={"#CBD5E0"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
