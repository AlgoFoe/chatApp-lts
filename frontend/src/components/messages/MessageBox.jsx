import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { useAuthContext } from "../../context/AuthContext";
import { IoIosVideocam } from "react-icons/io";
import PingMeTrans from "../../assets/logos/Ping.png";
import { useSocketContext } from "../../context/SocketContext";
import VideoPlayer from "../call/VideoPlayer";
import Options from "../call/Options";
import { useContext } from 'react';
import { CallContext } from "../../context/CallContext"; 
import useSendMessage from "../../hooks/useSendMessage";

const MessageBox = () => {
  const { selectedChatConversation, setSelectedChatConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedChatConversation?.userId);
  const [isCalling, setIsCalling] = useState(false);
  const { startStream,clientId } = useContext(CallContext);
  const {sendMessage} = useSendMessage();

  useEffect(() => {
    return () => setSelectedChatConversation(null);
  }, [setSelectedChatConversation]);

  const handleCallClick = () => {
    startStream(); 
    setIsCalling(true);
  };
  const handleNotify = () => {
    sendMessage(`Join call with ID:${clientId}`,new Date().toISOString());
  }

  return (
    <div className="md:min-w-[450px] w-full flex flex-col">
      {!selectedChatConversation ? (
        <NoChatSelected />
      ) : (
        isCalling ? (
          <div className="d-flex flex-column align-items-center overflow-auto" style={{ width: "100%" }}>
            <div className="flex gap-2 items-center bg-slate-500 px-4 py-2 mb-2">
              <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className="w-12 rounded-full">
                  <img src={selectedChatConversation.userProfilePic} alt="user avatar" />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col">
                  <span className="text-gray-900 text-xl font-bold">{selectedChatConversation.username}</span>
                  <span className="-mt-1">
                    {isOnline && <p className="text-sm text-white opacity-70">online</p>}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-center">
              <VideoPlayer receiverName={selectedChatConversation.username} />
            </div>
            <div className="w-100 d-flex justify-content-center">
              <Options/>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-2 items-center bg-slate-500 px-4 py-2 mb-2">
              <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className="w-12 rounded-full">
                  <img src={selectedChatConversation.userProfilePic} alt="user avatar" />
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex flex-col">
                  <span className="text-gray-900 text-xl font-bold">{selectedChatConversation.username}</span>
                  <span className="-mt-1">
                    {isOnline && <p className="text-sm text-white opacity-70">online</p>}
                  </span>
                </div>
                <IoIosVideocam
                  className="w-10 h-10 cursor-pointer hover:text-teal-500 text-white absolute right-36 p-2 rounded-full hover:bg-slate-600"
                  onClick={handleCallClick}
                />
                <button
                  className="btn-sm text-base font-bold cursor-pointer hover:text-teal-500 text-white absolute right-2 rounded-md hover:bg-slate-600"
                  onClick={handleNotify}
                >Notify {selectedChatConversation.username}</button>
              </div>
            </div>
            <Messages />
            <MessageInput />
          </>
        )
      )}
    </div>
  );
};

export default MessageBox;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} !</p>
        <p>No chat selected</p>
        <img src={PingMeTrans} alt="PingMeTrans" className="w-28 h-28" />
      </div>
    </div>
  );
};
