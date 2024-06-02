import { useState, useContext } from 'react';
import { CallContext } from '../../context/CallContext';
import { useAuthContext } from '../../context/AuthContext';

const Options = ({ children }) => {
    const {authUser} = useAuthContext();
    const { clientId, callAccepted, name, setName, callEnded, hangupCall, callUser } = useContext(CallContext);
    const [idToCall, setIdToCall] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault(); 
    };
    setName(authUser.username);
    return (
        <div className="container" style={{ maxWidth: '600px', margin: '35px auto' }}>
            <div className="p-3 rounded-md border-2 border-gray-500" style={{ padding: '10px 20px' }}>
                <form className="d-flex flex-column" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-6 p-2">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Name" 
                                value={name} 
                            />
                            <button 
                                type="button" 
                                className="btn btn-accent text-xl mt-3 w-100" 
                                onClick={() => navigator.clipboard.writeText(clientId)}
                            >
                                Copy Your ID
                            </button>
                        </div>
                        <div className="col-12 col-md-6 p-2">
                            <h6>Make a call</h6>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="ID to call" 
                                value={idToCall} 
                                onChange={(e) => setIdToCall(e.target.value)} 
                            />
                            {callAccepted && !callEnded ? (
                                <button 
                                    type="button" 
                                    className="btn text-xl btn-error mt-3 w-100" 
                                    onClick={hangupCall}
                                >
                                    Hang Up
                                </button>
                            ) : (
                                <button 
                                    type="button"
                                    className="btn btn-accent text-xl mt-3 w-100" 
                                    onClick={() => callUser(idToCall)}
                                >
                                    Call
                                </button>
                            )}
                        </div>
                    </div>
                </form>
                {children}
            </div>
        </div>
    );
};

export default Options;
