// import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import grayTick from "../../assets/logos/grayTick.svg";
import blueTick from "../../assets/logos/blueTick.svg";

const Message = ({message}) => {
	const { authUser } = useAuthContext();
	const { selectedChatConversation} = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilePic : selectedChatConversation?.userProfilePic;
	const bubbleBgColor = fromMe ? "bg-teal-500" : "";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='chat bubble' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble max-w-60 text-white ${bubbleBgColor} ${shakeClass} pb-2 break-words`}>{message.message}</div>
			<div className='chat-footer text-xs justify-center flex gap-1 items-center'>
				<span className="opacity-50">{formattedTime}</span>
				{fromMe && (<span>
					<img src={grayTick} alt="tick" className={`w-4 h-4 ${message.seen? 'hidden' : ''}`} />
					<img src={blueTick} alt="tick" className={`w-4 h-4 ${message.seen ? '' : 'hidden'}`} />
				</span>)}
			</div>
		</div>
	);
};
export default Message;

