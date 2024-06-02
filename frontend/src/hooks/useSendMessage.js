import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { extractTime } from "../utils/extractTime";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, updateConversation,setMessages, selectedChatConversation } = useConversation();

	const sendMessage = async (message,updatedTime) => {
		setLoading(true);
		try {
			const formattedTime = extractTime(updatedTime);
			const res = await fetch(`/api/messages/send/${selectedChatConversation.userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message,formattedTime }),
			});
			const data = await res.json();
			console.log(updatedTime);

			if (data.error) throw new Error(data.error);
			console.log("allConversations");
			setMessages([...messages, data]);
			updateConversation(selectedChatConversation, message,data.senderId,formattedTime);
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	
	return { sendMessage, loading };
};
export default useSendMessage;