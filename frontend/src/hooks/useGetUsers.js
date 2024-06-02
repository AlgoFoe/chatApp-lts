import {useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useAuthContext } from "../context/AuthContext";

const useGetUsers = (searchText) => {
    const {authUser} = useAuthContext();
    const [searchingUser, setSearchingUser] = useState(false);
	const [conversations, setConversations] = useState([]);
    const {setSelectedChatConversation} = useConversation();

    const getUsers= async (e) => {
		e.preventDefault();
		setSearchingUser(true);
		try {
			const res = await fetch(`/api/users/profile/${searchText}`);
			const searchedUser = await res.json();
			if (searchedUser.error) {
				toast.error(searchedUser.error);
				return;
			}

			const messagingYourself = searchedUser._id === authUser._id;
			if (messagingYourself) {
				toast.error("You cannot message yourself");
				return;
			}

			const conversationAlreadyExists = conversations.find(
				(conversation) => conversation.participants[0]._id === searchedUser._id
			);

			if (conversationAlreadyExists) {
				setSelectedChatConversation({
					_id: conversationAlreadyExists._id,
					userId: searchedUser._id,
					username: searchedUser.username,
					userProfilePic: searchedUser.profilePic,
				});
				return;
			}

			const mockConversation = {
				mock: true,
				lastMessage: {
					text: "",
					sender: "",
					updatedTime: "",
					seen:false
				},
				_id: Date.now(),
				participants: [
					{
						_id: searchedUser._id,
						username: searchedUser.username,
						profilePic: searchedUser.profilePic,
					},
				],
			};
			setConversations((prevConvs) => [...prevConvs, mockConversation]);
		} catch (error) {
			toast.error("Error", error.message, "error");
		} finally {
			setSearchingUser(false);
		}
	};
    return {searchingUser,getUsers};
};
export default useGetUsers;