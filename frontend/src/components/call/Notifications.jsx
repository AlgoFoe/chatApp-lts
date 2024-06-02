import { useContext } from 'react';
import { CallContext } from '../../context/CallContext';
import { ImPhoneHangUp } from "react-icons/im";
import { FaPhone } from "react-icons/fa6";

const Notifications = () => {
    const { answerCall,rejectCall, callInfo, callAccepted } = useContext(CallContext);

    return (
        <>
            {callInfo.isReceivedCall && !callAccepted && (
                <div className='rounded-md mb-1 pb-3 pt-2 pr-1 pl-1 bg-slate-600' style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <h1 className='font-bold text-black'>{callInfo.name} is calling:</h1>
                    <FaPhone className=' rounded-full text-white pb-1 pt-0.5 pl-1 pr-1 w-8 h-8 bg-green-500 hover:bg-green-600' onClick={answerCall}/>
                    <ImPhoneHangUp className=" rounded-full text-white pb-1 pt-0.5 pl-1 pr-1 w-8 h-8 bg-red-500 hover:bg-red-600" onClick={rejectCall} />
                </div>
            )}
        </>
    );
};

export default Notifications;
