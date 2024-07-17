import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      history.push("/chats");
    }
  }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={1.5}
        bg={"#4bacfc7a"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          fontSize="3xl"
          fontFamily="work sans"
          textAlign="center"
          textColor={"#180a31"}
          fontWeight={"bold"}
        >
          Chatter Boxie
        </Text>
      </Box>
      <Box
        bg={"#4bacfc7a"}
        w={"100%"}
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        textColor={"#180a31"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab textColor={"#180a31"} w={"50%"}>
              Login
            </Tab>
            <Tab textColor={"#180a31"} w={"50%"}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login></Login>
            </TabPanel>
            <TabPanel>
              <SignUp></SignUp>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
