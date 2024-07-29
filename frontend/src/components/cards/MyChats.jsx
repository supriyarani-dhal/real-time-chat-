import { AddIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/ChatProvider";
import { Box, Button, Divider, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatLoading from "../common/ChatLoading";
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "../miscellaneous/GroupChatModal";
import { getRandomEmoji } from "../common/Emoji";

// eslint-disable-next-line react/prop-types
const MyChats = ({ fetchAgain }) => {
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the Chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      w={{ base: "100%", md: "31%" }}
      textColor={"#CBD5E0"}
      borderRadius={"lg"}
      borderWidth={"1px"}
      borderColor={"rgba(255, 255, 255, 0.125)"}
      boxShadow={"md"}
      backgroundColor="rgba(74, 144, 226, 0.4)"
      backdropFilter={"blur(25px) saturate(200%)"}
    >
      <Box
        pb={3}
        px={3}
        fontFamily={"work sans"}
        fontSize={{ base: "28px", md: "30px" }}
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            bg={"RGBA(0, 0, 0, 0.36)"}
            _hover={{ bg: "RGBA(0, 0, 0, 0.48)" }}
            textColor={"#CBD5E0"}
            borderRadius={"20px"}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Divider />
      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat) => (
              <>
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor={"pointer"}
                  bg={selectedChat === chat && "#0BC5EA"}
                  key={chat._id}
                  px={3}
                  py={2}
                  borderRadius={"lg"}
                  _hover={{
                    bg: "#0BC5EA",
                  }}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  <span style={{ fontSize: "x-larger" }}>
                    {getRandomEmoji()}
                  </span>
                </Box>
                <Divider />
              </>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
