import { Avatar, Box, Text } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor={"pointer"}
      bg="blue.300"
      _hover={{
        bg: "#7936c9d6",
        color: "white",
      }}
      w={"100%"}
      display={"flex"}
      alignItems={"center"}
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar
        mr={2}
        size={"sm"}
        cursor={"pointer"}
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize={"xs"}>
          <b>Email :</b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
