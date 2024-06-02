import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import   useConversation from "../zustand/useConversation";
import { extractTime } from "../utils/extractTime";
import { useAuthContext } from "../context/AuthContext";


const useListenMessages = () => {
	const {authUser} = useAuthContext();
	const { socket } = useSocketContext();
	const { messages,updateNewConversation, markMessagesAsSeen,setMessages, allConversations, setAllConversations, selectedChatConversation } = useConversation();

	useEffect(() => {
		if (socket) {
			socket.on("newMessage", (newMessage) => {
				newMessage.shouldShake = true;
				const formattedTime = extractTime(newMessage.updatedAt)

				if (selectedChatConversation._id === newMessage.conversationId) {
					setMessages([...messages, newMessage]);
				}
				const conv = allConversations.find(conv => conv._id === newMessage.conversationId);
				console.log("MATCHING:", conv);
				if (updateNewConversation) {
					updateNewConversation(newMessage, formattedTime);
				}
			});

			return () => socket.off("newMessage");
		}
	}, [socket, setMessages, messages, selectedChatConversation, setAllConversations]);

	useEffect(() => {
		const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].senderId !== authUser._id;
		if (socket) {
			if (lastMessageIsFromOtherUser) {
				console.log("SUUUUUUUUUUUUUIIIII");
				socket.emit("markMessagesAsSeen", {
					conversationId: selectedChatConversation._id,
					userId: selectedChatConversation.userId,
				});
			}

			socket.on("messagesSeen", ({ conversationId }) => {
				if (selectedChatConversation._id === conversationId) {
					markMessagesAsSeen();
				}
			});
		}
	}, [socket,messages, authUser._id,selectedChatConversation, markMessagesAsSeen]);

};
export default useListenMessages;