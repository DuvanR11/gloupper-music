'use client'

import{ useContext, useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { ChatBox, Conversation} from "@/components/chat";
import { Typography } from "@mui/material";
import { userChats } from "@/api/Chat";

const MessageClient = ({ currentUser }: any) => {

  const socket: any = useRef();

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(currentUser.id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [currentUser]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", currentUser.id);
    socket.current.on("get-users", (users: any) => {
      setOnlineUsers(users);
    });
  }, [currentUser]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data: any) => {
      setReceivedMessage(data);
    }

    );
  }, []);

  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat.members.find((member: any) => member !== currentUser.id);
    const online = onlineUsers.find((user: any) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <div className="Chat">

        {/* Left Side */}
        <div className="Left-side-chat">
          <div className="Chat-container">
            <Typography variant='h2' fontWeight={ 600 } fontSize={ 18 }>Chats</Typography>
            <div className="Chat-list">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => { setCurrentChat(chat) }}
                >
                  <Conversation
                    chat={chat}
                    currentUser={currentUser.id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="Right-side-chat">
          <ChatBox
            chat={currentChat}
            currentUser={currentUser.id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>
      </div>  
    </>
  );
};

export default MessageClient;
