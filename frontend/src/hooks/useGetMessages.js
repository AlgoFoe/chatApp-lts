import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";
// import { useSocketContext } from "../context/SocketContext";


const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { selectedChatConversation,messages,setMessages } = useConversation();
	// const { socket } = useSocketContext();
	// const { authUser } = useAuthContext();
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/${selectedChatConversation.userId}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedChatConversation?.userId){
			getMessages();
		}
	}, [selectedChatConversation, setMessages]);

	// useEffect(() => {
	// 	const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].sender !== authUser._id;
	// 	if (socket && selectedChatConversation && lastMessageIsFromOtherUser) {
	// 		console.log("EVENT_EMIT : markMessagesAsSeen()")
	// 		socket.emit("markMessagesAsSeen", {
	// 			conversationId: selectedChatConversation._id,
	// 			userId: selectedChatConversation.userId,
	// 		});
	// 	}
	// }, [socket, messages,selectedChatConversation,authUser._id]);

	// useEffect(() => {
	// 	if (socket) {
	// 		const handleMessagesSeen = ({ conversationId }) => {
	// 			if (selectedChatConversation._id === conversationId) {
	// 				markMessagesAsSeen();
	// 				console.log("markMessagesAsSeen()");
	// 			}
	// 		};

	// 		socket.on("messagesSeen", handleMessagesSeen);

	// 		return () => {
	// 			socket.off("messagesSeen", handleMessagesSeen);
	// 		};
	// 	}
	// }, [socket, selectedChatConversation, markMessagesAsSeen]);

	return { messages, loading };
};
export default useGetMessages;