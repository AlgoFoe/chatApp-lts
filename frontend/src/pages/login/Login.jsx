import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import PingMeTrans from "../../assets/logos/Ping.png";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='flex font-mono flex-col items-center justify-center bg-gray-700 rounded-md min-w-96 mx-auto'>
			
			<div style={{height:'25rem'}} className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login 
				</h1>
				<img src={PingMeTrans} alt='PingMeTrans' className='top-0 right-12 absolute w-24 h-24' />

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Link to='/signup' className='text-sm ml-2 hover:underline hover:text-teal-500 mt-12 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn text-lg hover:bg-teal-500 hover:text-black btn-block mt-2 btn-sm' disabled={loading}>
							{loading ? <span className='loading loading-spinner text-accent'></span> : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;