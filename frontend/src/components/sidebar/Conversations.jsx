import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
import Notifications from "../call/Notifications";
import { CallContext } from "../../context/CallContext";
import { useContext } from "react";

const Conversations = () => {
	const { loading, allConversations } = useGetConversations();
	const { showNotifications } = useContext(CallContext);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{showNotifications && <Notifications />}
			{allConversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					lastIdx={idx === allConversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner text-accent mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;