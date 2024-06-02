// import { useEffect } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

// const useGetChatConversation = () => {
// 	const { selectedConversation,chatConversation,setChatConversation } = useConversation();

// 	useEffect(() => {
// 		const getChatConversation = async () => {
// 			try {
// 				const res = await fetch(`/api/messages/conversation/${selectedConversation._id}`);
// 				const data = await res.json();
// 				if (data.error) throw new Error(data.error);
// 				setChatConversation(data);
//                 console.log("Client:",data);
// 			} catch (error) {
// 				toast.error(error.message);
// 			} 
// 		};

// 		if (selectedConversation?._id) getChatConversation();
// 	}, [selectedConversation?._id, setChatConversation]);

// 	return { chatConversation, };
// };
// export default useGetChatConversation;