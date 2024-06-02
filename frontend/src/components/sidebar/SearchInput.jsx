import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
// import useConversation from "../../zustand/useConversation";
// import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import useGetUsers from "../../hooks/useGetUsers";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	// const { setSelectedChatConversation } = useConversation();
	const { searchingUser ,getUsers } = useGetUsers(search);

	const handleSubmit = (e) => {
		// e.preventDefault();
		getUsers(e);
		if (!search) return;
		if (search.length < 2) {
			return toast.error("Less than 2 characters");
		}

		// const conversation = allConversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		// if (conversation) {
		// 	setSelectedChatConversation(conversation);
		// 	setSearch("");
		// } else toast.error("User not found!");
	};
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-teal-500 text-white'>
				{searchingUser ?(<span className='loading loading-spinner text-accent'></span>):(<IoSearchSharp className='w-6 h-6 outline-none hover:text-accent' />)}
			</button>
		</form>
	);
};
export default SearchInput;