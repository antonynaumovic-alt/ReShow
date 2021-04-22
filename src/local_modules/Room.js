import React, { useRef, useEffect } from "react";

const Room = (props) => {
    
    const userVideo = useRef();
    const partnerVideo = useRef();
    const userStream = useRef();
    var myStream;

    function muteMic(){
        myStream.getAudioTracks()[0].enabled = !(myStream.getAudioTracks()[0].enabled);
    }
    
    function muteCamera(){
        myStream.getVideoTracks()[0].enabled = !(myStream.getVideoTracks()[0].enabled);
    }

    function leaveRoom(){
        window.history.back();
    }

    return (
        <div>
            <video controls style={{height: 300}} autoPlay ref={userVideo} />
            <video controls style={{height: 300}} autoPlay ref={partnerVideo} />
            <button className="btn-createRoom" onClick={muteMic}>Toggle Mic</button>
            <button className="btn-createRoom" onClick={muteCamera}>Toggle Camera</button>
            <button className="btn-createRoom" onClick={leaveRoom}>Leave Room</button>
        </div>
    );

};

export default Room;
