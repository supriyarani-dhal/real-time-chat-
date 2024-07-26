import { Avatar, Box, Divider, Text } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
const UserListItem = ({ user, handleFunction }) => {
  return (
    <>
      <Box
        onClick={handleFunction}
        cursor={"pointer"}
        _hover={{
          bg: "#0BC5EA",
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
      <Divider />
    </>
  );
};

export default UserListItem;
