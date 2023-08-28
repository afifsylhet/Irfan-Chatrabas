import axios from "../../utils/axios";

// Get All Expence
export const getExpences = async (
  keyword = "",
  currentPage = 1,
  catagory = ""
) => {

  const config = {
    withCredentials: true, // Include cookies in the request
  };

  let link = `/admin/expences?keyword=${keyword}&page=${currentPage}`;

  if (catagory) {
    link = `/admin/expences?keyword=${keyword}&page=${currentPage}&catagory=${catagory}`;
  }

  const response = await axios.get(link, config );

  return response.data;
};

// Get Single Expence Details
export const getExpenceDetails = async (expenceId) => {
  const config = {
    withCredentials: true, // Include cookies in the request
  };
  const response = await axios.get(`/expence/${expenceId}`, config);

  return response.data;
};

// Post single Expence

export const addExpence = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.post("/expence/new", formData, config);
  return response.data;
};

// Update Single expence

export const updateExpence = async (expenceId, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.put(`/admin/expence/${expenceId}`, formData, config);
  return response.data;
};

// Delete an Expence
export const deleteExpence = async (expenceId) => {
  const config = {
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.delete(`/admin/expence/${expenceId}`, config);
  return response.data;
};