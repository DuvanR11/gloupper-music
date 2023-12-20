import React, { FC, useEffect, useState } from "react";
import { useRef } from "react";


import { addMessage, getMessages } from "@/api/Message";
import { getUser } from "@/api/User";
import { IconButton, Typography } from "@mui/material";
import { getCenter } from "@/api/Center";
import InputEmoji from 'react-input-emoji';


export const ChatBox: FC<any> = ({ chat, currentUser, setSendMessage,  receivedMessage }) => {
  
  const [userData, setUserData] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage: any)=> {
    setNewMessage(newMessage)
  }

  // fetching data for header
  useEffect(() => {
    const receiverId = chat?.members?.find((id: any) => id !== currentUser);


    const getUserData = async () => {
      try {
        // if ( currentUser.rol == 'owner' ) {
        //   const { data } = await getUser(receiverId);
        //   setUserData(data)
        // } else {
        //   const { data } = await getCenter(receiverId);
        //   setUserData(data)
        // }
        const { data } = await getUser(receiverId);
          setUserData(data)
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser ]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat.id);
        console.log('mesajes', data)
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  // useEffect(()=> {
  //   scroll.current?.scrollIntoView({ behavior: "smooth" });
  // },[messages])

  // Send Message
  const handleSend = async(e: any)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat.id,
  }
  const receiverId = chat.members.find((id: any)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
  // send message to database
  try {
    const { data } = await addMessage(message);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}

useEffect(()=> {
  if (receivedMessage !== null && receivedMessage.chatId === chat.id) {
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage])


  const scroll: any = useRef();
  const imageRef: any = useRef();
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="flex gap-2 follower">
                <img
                  src={
                    userData?.image
                      ? userData?.image
                      : "/images/defaultProfile.png"
                  }
                  alt="Profile"
                  className="rounded-full"
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <div><p>{userData?.name}</p> <p>{userData?.category}</p></div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message: any, index: number) => (
                <>
                  <div ref={scroll}
                    key={index}
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message rec"
                    }
                  >
                    <Typography variant='body1' fontSize={ 12 }>{message.text}</Typography>{" "}
                    <Typography variant='body2' fontSize={ 8 }>message.createdAt</Typography>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">              
              <IconButton onClick={() => imageRef.current.click()}>
                #
              </IconButton>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <IconButton onClick={ handleSend }>
                Send
              </IconButton>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Haz click en un contacto para iniciar la conversación
          </span>
        )}
      </div>
    </>
  );
};

