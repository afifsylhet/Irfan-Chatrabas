import React, { useEffect, useState } from "react";
import { fetchBorders } from "../../features/slice/BordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Expence from "./Expence";
import Paginations from "./Paginations";
import { Container, Row } from "react-bootstrap";
import { fetchExpence } from "../../features/slice/expenceSlice";

const Expences = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [catagory, setCatagory] = useState("");

  const handlePageChange = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(fetchExpence({ keyword, currentPage, catagory }));
  }, [dispatch, keyword, currentPage, catagory]);

  const { isLoading, error, ownError, expenceCount, resultPerPage, expences } =
    useSelector((state) => state.expence);

  return (
    <>
      <br />
      <Container fluid>
        <Row xs={1} md={2} lg={4} className="g-3">
          {expences?.map((expence) => (
            <Expence key={expence?._id} expence={expence} />
          ))}
        </Row>
        <br />
        {/* Bootstrap Paginations} */}
        {expenceCount > expences?.length && (
          <div className="d-flex justify-content-center">
            <Paginations
              expenceCount={expenceCount}
              resultPerPage={resultPerPage}
              expences={expences}
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

export default Expences;
