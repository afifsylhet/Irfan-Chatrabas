import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadEntryUserDetails } from "../../features/slice/userSlice";
import { fetchRoomDetails } from "../../features/slice/roomSlice";

const Room = ({ room }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const roomId = room.user;

  useEffect(() => {
    dispatch(fetchRoomDetails(roomId));
  }, [dispatch, roomId]);

  return (
    <Col>
      <Link style={{ textDecoration: "none" }} to={`/room/update/${room._id}`}>
        <Card className="p-2">
          <p> Room No : {room?.roomNumber} </p>
          <p> Room Id : {room?._id}</p>
          <p> Floor Number : {room?.floorNumber}</p>
          <p> Room Type : {room.roomType}</p>
          <p> Room Status : {room.roomStatus}</p>
          <p>
            Entry On : {" "}
            {room?.createdAt && String(room.createdAt.substr(0, 10))}
          </p>
          {room.updatedAt && <p> Updated On : {String(room.updatedAt.substr(0, 10))}</p> }
          <p>Entry By : {room?.entryBy}</p>
        </Card>
      </Link>
    </Col>
  );
};

export default Room;
