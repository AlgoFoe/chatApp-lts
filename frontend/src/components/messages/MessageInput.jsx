import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message,new Date().toISOString());
		setMessage("");
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border outline-none focus:border-teal-500 text-base rounded-lg block w-full pl-2.5 pt-2.5 pb-2.5 pr-10 bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute pl-2 inset-y-0 end-0 flex items-center pe-1'>
					{loading ? <div className='loading loading-spinner text-accent'></div> : <BsSend className="w-10 h-10 pl-2 pt-1 pb-1 pr-2  rounded-md hover:bg-gray-600 text-accent text-base" />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;