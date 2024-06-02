import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import grayTick from "../../assets/logos/grayTick.svg";
import blueTick from "../../assets/logos/blueTick.svg";

const Conversation = ({ conversation, lastIdx }) => {
	const {setSelectedChatConversation, selectedChatConversation } = useConversation();
	const isSelected = selectedChatConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation.participants[0]._id);
	const { authUser } = useAuthContext();

	const user = conversation.participants[0];	
	const lastMessage = conversation.lastMessage.text;
	const formattedTime = conversation.lastMessage.updatedTime;
	return (
		<>	
			<div
				className={`flex gap-2 items-center hover:bg-teal-500 hover:text-black  rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-teal-500 text-black" : ""}
			`}
				onClick={() => setSelectedChatConversation({
					_id: conversation._id,
                    userId: user._id,
                    userProfilePic: user.profilePic,
                    username: user.username
				})}
			>
				<div className={`avatar ${isOnline ? "online" : "offline"}`}>
					<div className='w-12 rounded-full'>
						<img src={user.profilePic} alt='user avatar' />
						<img src={conversation.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1 overflow-hidden'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold '>{user.username}</p>
						<p className="text-sm">{formattedTime}</p>
					</div>
					<span className="flex items-center gap-1">
					{authUser._id === conversation.lastMessage.sender ?<img src={conversation.lastMessage.seen?blueTick:grayTick} alt="tick" className='w-4 h-4' />:''}
					<p title={lastMessage} className='text-sm max-w-40 overflow-hidden whitespace-nowrap text-ellipsis'>{lastMessage}</p>
					</span>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;