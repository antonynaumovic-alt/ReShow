import React from "react";
import { v1 as uuid } from "uuid";

const CreateRoom = (props) => {
    function createRoomInternal() {
        const id = uuid();
        //Create Unique Room ID
        props.history.push(`/room/${id}`);
        //Assign Unique Room ID
    }

    return (
        <div className="createroom-div">
            <a className="btn-createRoom" onClick={createRoomInternal}>Create Room</a>
        </div>
    );
}

export default CreateRoom;