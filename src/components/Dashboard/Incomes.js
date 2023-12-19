import React, { useEffect, useState } from "react";
import { fetchBorders } from "../../features/slice/BordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Income from "./Income";
import { Container, Row } from "react-bootstrap";
import { fetchIncomes } from "../../features/slice/incomeSlice";
import IncomePagenation from "./IncomePagenation";

const Incomes = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [catagory, setCatagory] = useState("");

  const handlePageChange = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(fetchIncomes({ keyword, currentPage, catagory }));
  }, [dispatch, keyword, currentPage, catagory]);

  const { isLoading, error, ownError, incomeCount, resultPerPage, incomes } =
    useSelector((state) => state.income);


  return (
    <>
      <br />
      <Container fluid>
        <Row xs={1} md={2} lg={4} className="g-3">
          {incomes?.map((income) => (
            <Income key={income?._id} income={income} />
          ))}
        </Row>
        <br />
        {/* Bootstrap IncomePagenation} */}
        {incomeCount > incomes?.length && (
          <div className="d-flex justify-content-center">
            <IncomePagenation
              incomeCount={incomeCount}
              resultPerPage={resultPerPage}
              incomes={incomes}
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

export default Incomes;
