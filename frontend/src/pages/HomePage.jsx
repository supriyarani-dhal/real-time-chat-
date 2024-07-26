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
        w="100%"
        m="40px 0 15px 0"
        borderRadius="12px"
        borderWidth="1px"
        borderColor={"rgba(255, 255, 255, 0.125)"}
        boxShadow={"md"}
        backgroundColor="rgba(74, 144, 226, 0.4)"
        backdropFilter={"blur(20px) saturate(200%)"}
      >
        <Text
          fontSize="3xl"
          fontFamily="work sans"
          textAlign="center"
          textColor={"#CBD5E0"}
          fontWeight={"bold"}
        >
          Chatter Boxie
        </Text>
      </Box>
      <Box
        w={"100%"}
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={"rgba(255, 255, 255, 0.125)"}
        boxShadow={"md"}
        backgroundColor="rgba(74, 144, 226, 0.4)"
        backdropFilter={"blur(20px) saturate(200%)"}
        textColor={"#CBD5E0"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab textColor={"#CBD5E0"} w={"50%"}>
              Login
            </Tab>
            <Tab textColor={"#CBD5E0"} w={"50%"}>
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
