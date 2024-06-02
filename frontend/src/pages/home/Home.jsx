import MessageBox from "../../components/messages/MessageBox";
import Sidebar from "../../components/sidebar/Sidebar";
// sm:h-[450px] md:h-[550px]
const Home = () => {
	return (
		<div style={{height:'100vh',width:'100vw'}} className='flex overflow-hidden'>
			<Sidebar />
			<MessageBox />
		</div>
	);
};
export default Home;
