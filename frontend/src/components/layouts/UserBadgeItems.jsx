import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

// eslint-disable-next-line react/prop-types
const UserBadgeItems = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius={"lg"}
      m={1}
      mb={2}
      variant="solid"
      bg={"purple.500"}
      color={"white"}
      cursor={"pointer"}
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItems;
