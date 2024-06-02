import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{!loading ? (
				<BiLogOut className='w-10 h-10 pr-2 text-accent rounded-full hover:bg-gray-600 cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner text-accent'></span>
			)}
		</div>
	);
};
export default LogoutButton;