import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
import { ChatState } from "../../context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { extractTime } from "../../config/ExtractTime";
import { useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  const lastMessage = useRef();
  console.log(lastMessage);
  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <ScrollableFeed>
      {messages &&
        // eslint-disable-next-line react/prop-types
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id} ref={lastMessage}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt={"7px"}
                  mr={1}
                  size={"sm"}
                  cursor={"pointer"}
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#2C5282" : "#2D3748"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
              }}
            >
              {m.content}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "small",
                margin: "0 3px 0 3px",
              }}
            >
              {extractTime(m.createdAt)}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
