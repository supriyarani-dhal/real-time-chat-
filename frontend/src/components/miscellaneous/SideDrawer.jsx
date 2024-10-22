import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ChatLoading from "../common/ChatLoading";
import UserListItem from "../layouts/UserListItem";
import { getSender } from "../../config/ChatLogics";
import NotificationBadge, { Effect } from "react-notification-badge";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const history = useHistory();
  const btnRef = useRef();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    user,
    chats,
    setChats,
    setSelectedChat,
    notification,
    setNotification,
  } = ChatState();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResults(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error in fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        textColor={"#CBD5E0"}
        fontWeight={"bold"}
        w={"100%"}
        borderWidth={"5px"}
        p={"5px 10px 5px 10px"}
        borderRadius="12px"
        borderColor={"rgba(255, 255, 255, 0.125)"}
        boxShadow={"md"}
        backgroundColor="rgba(74, 144, 226, 0.4)"
        backdropFilter={"blur(20px) saturate(200%)"}
        pos={"relative"}
        zIndex={2}
      >
        <Tooltip
          label="Search users to make a chat"
          hasArrow
          placement="bottom-end"
        >
          <Button
            textColor={"#CBD5E0"}
            variant={"ghost"}
            _hover={{ bg: "blue.400" }}
            ref={btnRef}
            onClick={onOpen}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily={"work sans"}>
          Chatter-Boxie
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            <MenuList
              borderColor={"rgba(255, 255, 255, 0.125)"}
              boxShadow={"md"}
              backgroundColor="rgba(74, 144, 226, 0.4)"
              backdropFilter={"blur(25px) saturate(200%)"}
            >
              {!notification.length && "No new messages"}
              {notification.map((notif) => (
                <MenuItem
                  backgroundColor="rgba(74, 144, 226, 0.4)"
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              _hover={{ bg: "blue.400" }}
              variant={"ghost"}
            >
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList
              borderColor={"rgba(255, 255, 255, 0.125)"}
              boxShadow={"md"}
              backgroundColor="rgba(74, 144, 226, 0.4)"
              backdropFilter={"blur(25px) saturate(200%)"}
            >
              <ProfileModal user={user}>
                <MenuItem
                  backgroundColor="rgba(74, 144, 226, 0.4)"
                  _hover={{
                    bg: "#0BC5EA",
                    color: "white",
                  }}
                >
                  My Profile
                </MenuItem>
              </ProfileModal>
              <MenuDivider></MenuDivider>
              <MenuItem
                backgroundColor="rgba(74, 144, 226, 0.4)"
                _hover={{
                  bg: "#0BC5EA",
                  color: "white",
                }}
                onClick={logoutHandler}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          borderColor={"rgba(255, 255, 255, 0.125)"}
          boxShadow={"md"}
          backgroundColor="rgba(155, 155, 155, 0.28)"
          backdropFilter={"blur(20px) saturate(200%)"}
          textColor={"#CBD5E0"}
        >
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>

          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
                bg={"RGBA(0, 0, 0, 0.48)"}
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button colorScheme="green" onClick={handleSearch}>
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResults.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
          </DrawerBody>
          {loadingChat && <Spinner ml="auto" d="flex" />}

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>*/}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
