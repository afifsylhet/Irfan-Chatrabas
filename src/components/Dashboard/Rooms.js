import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Room from "./Room";
import RoomPagenation from "./RoomPagenation";
import { Container, Row } from "react-bootstrap";
import { fetchRooms } from "../../features/slice/roomSlice";

const Rooms = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [catagory, setCatagory] = useState("");

  const handlePageChange = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(fetchRooms({ keyword, currentPage, catagory }));
  }, [dispatch, keyword, currentPage, catagory]);

  const { isLoading, error, ownError, roomCount, resultPerPage, rooms } =
    useSelector((state) => state.room);


  return (
    <>
      <br />
      <Container fluid>
        <Row xs={1} md={2} lg={4} className="g-3">
          {rooms?.map((room) => (
            <Room key={room?._id} room={room} />
          ))}
        </Row>
        <br />
        {/* Bootstrap RoomPagenation} */}
        {roomCount > rooms?.length && (
          <div className="d-flex justify-content-center">
            <RoomPagenation
              roomCount={roomCount}
              resultPerPage={resultPerPage}
              rooms={rooms}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
        <br />
      </Container>
    </>
  );
};

export default Rooms;
