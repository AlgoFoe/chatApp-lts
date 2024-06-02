import { useContext,useEffect } from 'react';
import { CallContext } from '../../context/CallContext';

const VideoPlayer = ({receiverName}) => {
    const { callAccepted, myVideo, userVideo, callEnded, stream } = useContext(CallContext);
    useEffect(() => {
        if (stream && myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      }, [stream,myVideo]);
    return (    
        <>
        <div className="flex flex-wrap justify-center">
            {stream && (
                <div className="p-2 m-2">
                    <h5 className="mb-2 text-2xl font-bold">You</h5>
                    <video playsInline muted ref={myVideo} autoPlay className="w-full md:w-96 border-slate-700 rounded-lg" />
                </div>
            )}
            {callAccepted && !callEnded && (
                <div className="p-2 m-2">
                    <h5 className="mb-2 text-2xl font-bold">{receiverName}</h5>
                    <video playsInline ref={userVideo} autoPlay className="w-full md:w-96 border-slate-700 rounded-lg" />
                </div>
            )}
        </div>
        </>
    );
};

export default VideoPlayer;
