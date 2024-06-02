import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer/simplepeer.min.js";

const CallContext = createContext();
const socket = io("https://chatapp-lts.onrender.com");

const CallContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [clientId, setClientId] = useState("");
  const [callInfo, setCallInfo] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [showNotifications, setShowNotifications] = useState(true)
  useEffect(() => {
    socket.on("user-conn", async (id) => {
      setClientId(id);
    });

    socket.on("call-user", ({ from, name: callerName, signal }) => {
      setCallInfo({ isReceivedCall: true, from, name: callerName, signal });
    });

    socket.on("call-rejected", () => {
        setCallInfo({});
        setShowNotifications(false); 
        window.location.reload();
      });
  }, []);

  const startStream = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });
  };

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("answer-call", { signal: data, to: callInfo.from });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });
    peer.signal(callInfo.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    startStream();
    console.log("Calling");
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (data) => {
      socket.emit("call-user", {
        userToCall: id,
        signalData: data,
        from: clientId,
        name,
      });
    });
    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });
    socket.on("call-accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const rejectCall = () => {
    socket.emit("reject-call", { to: callInfo.from });
    setCallInfo({});
    setShowNotifications(false);
  };
  const hangupCall = () => {
    setCallEnded(true);

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    window.location.reload();
  };

  return (
    <CallContext.Provider
      value={{
        callInfo,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        clientId,
        callUser,
        hangupCall,
        answerCall,
        rejectCall,
        startStream,
        showNotifications,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export { CallContextProvider, CallContext };
