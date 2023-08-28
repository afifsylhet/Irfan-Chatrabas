import axios from "../../utils/axios";

// Get All Income
export const getIncomes = async (
  keyword = "",
  currentPage = 1,
  catagory = ""
) => {

  const config = {
    withCredentials: true, // Include cookies in the request
  };

  let link = `/admin/incomes?keyword=${keyword}&page=${currentPage}`;

  if (catagory) {
    link = `/admin/incomes?keyword=${keyword}&page=${currentPage}&catagory=${catagory}`;
  }

  const response = await axios.get(link, config );

  return response.data;
};

// Get Single Income Details
export const getIncomeDetails = async (id) => {
  const config = {
    withCredentials: true, // Include cookies in the request
  };
  const response = await axios.get(`/income/${id}`, config);

  return response.data;
};

// Post single income

export const addIncome = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.post("/income/new", formData, config);
  return response.data;
};

// Update Single Income

export const updateIncome = async (incomeId, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.put(`/admin/income/${incomeId}`, formData, config);
  return response.data;
};

// Delete an Income
export const deleteIncome = async (incomeId) => {
  const config = {
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.delete(`/admin/income/${incomeId}`, config);
  return response.data;
};