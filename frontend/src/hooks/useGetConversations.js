import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const { socket } = useSocketContext();
	const { allConversations,updateConversationSeenStatus,setAllConversations } = useConversation();

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await fetch("/api/messages/conversations");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setAllConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};
		getConversations();
	}, [setAllConversations])

	useEffect(() => {
		if(socket){
			socket.on("messagesSeen", ({ conversationId }) => {
				updateConversationSeenStatus(conversationId);
			});
		}
	}, [socket, updateConversationSeenStatus]);

	return { loading, allConversations };
};
export default useGetConversations;