import React, { useEffect, useState } from "react";
import { fetchBorders } from "../../features/slice/BordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Border from "./Border";
import Paginations from "./Paginations";
import { Container, Row } from "react-bootstrap";

const Borders = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [catagory, setCatagory] = useState("");

  const handlePageChange = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(fetchBorders({ keyword, currentPage, catagory }));
  }, [dispatch, keyword, currentPage, catagory]);

  const { isLoading, error, ownError, borderCount, resultPerPage, borders } =
    useSelector((state) => state.border);

  return (
    <>
      <br />
      <Container fluid>
        <Row xs={1} md={2} lg={4} className="g-3">
          {borders.map((border) => (
            <Border key={border._id} border={border} />
          ))}
        </Row>
        <br />
        {/* Bootstrap Paginations} */}
        {borderCount > borders.length && (
          <div className="d-flex justify-content-center">
            <Paginations
              borderCount={borderCount}
              resultPerPage={resultPerPage}
              borders={borders}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
        <br/>
      </Container>
    </>
  );
};

export default Borders;
