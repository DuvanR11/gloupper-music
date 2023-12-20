import React, { FC, useState } from "react";
import { useEffect } from "react";
import { getUser } from "@/api/User";
import { getCenter } from "@/api/Center";

export const Conversation: FC<any> = ({ chat, currentUser, online }) => {

  const [userData, setUserData] = useState<any>(null)
  const [business, setBusiness] = useState<any>(null)

  useEffect(()=> {

    const receiverId = chat?.members?.find((id: any) => id !== currentUser);
    const getUserData = async ()=> {
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
      }
      catch(error) {
        console.log(error)
      }
    }

    getUserData();
  }, []) 
  return (
    <>
      <div className="p-3 flex gap-2 conversation">
        {online ? <div className="online-dot"></div> : <div className="offline-dot"></div>}
        <img
          src={ userData?.image ? userData?.image : "/images/defaultProfile.png" }
          alt="Profile"
          className="rounded-full"
          style={{ width: "40px", height: "40px" }}
        />
        <div className="name" style={{fontSize: '0.8rem'}}>
  
            <span>{userData?.name}</span>

          <p style={{color: online?"#51e200":"#ff4545"}}>{online? "En linea" : "Desconectado"}</p>
        </div>
      </div>
      <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
    </>
  );
};


