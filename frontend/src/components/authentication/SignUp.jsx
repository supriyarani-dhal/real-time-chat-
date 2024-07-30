import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatter boxie");
      data.append("cloud_name", "dekkoia7w");
      fetch("https://api.cloudinary.com/v1_1/dekkoia7w/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data?.url?.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "please fill all the required feilds!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "password should match with confirmPassword!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      //the user credentials given to the backend through the bellow API from frontend
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );

      toast({
        title: "Registration successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      //store that data instance inside the localStorage in key-value pair
      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);

      history.push("/chats");

      toast({
        title: "Please refresh the after successfully signed in 😅",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Something went Wrong!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your Name"
          focusBorderColor="rgba(255, 255, 255, 0.125)"
          bg={"RGBA(0, 0, 0, 0.48)"}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl className="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          focusBorderColor="rgba(255, 255, 255, 0.125)"
          bg={"RGBA(0, 0, 0, 0.48)"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl className="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            focusBorderColor="rgba(255, 255, 255, 0.125)"
            bg={"RGBA(0, 0, 0, 0.48)"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm your Password"
            focusBorderColor="rgba(255, 255, 255, 0.125)"
            bg={"RGBA(0, 0, 0, 0.48)"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          bg={"RGBA(0, 0, 0, 0.48)"}
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button
        colorScheme="blackAlpha"
        w={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
