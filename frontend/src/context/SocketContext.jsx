import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import useConversation from "../zustand/useConversation";
import { extractTime } from "../utils/extractTime";


const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();
	const {updateNewConversation,setFormattedTimeOfLastMsg} = useConversation();
	
	useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:4000", {
				query: {
					userId: authUser._id,
				},
			});
			setSocket(socket);
			
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});
			socket.on("newLastMsg", (newLastMsg) => {
				const formattedTime = extractTime(newLastMsg.updatedAt);
				updateNewConversation(newLastMsg,formattedTime);
				setFormattedTimeOfLastMsg(formattedTime);
				return () => socket.close();
		});
		
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};