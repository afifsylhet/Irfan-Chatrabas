import axios from "../../utils/axios";

export const getBorders = async (
  keyword = "",
  currentPage = 1,
  catagory = "",
) => {
  let link = `/borders?keyword=${keyword}&page=${currentPage}`;

  if (catagory) {
    link = `/borders?keyword=${keyword}&page=${currentPage}&catagory=${catagory}`;
  }

  const response = await axios.get(link);

  return response.data;
};

// Get Single Border Details

export const getBordersDetails = async (id) => {
  const config = {
    withCredentials: true, // Include cookies in the request
  };
  const response = await axios.get(`/borderer/${id}`, config);

  return response.data;
};
// Add a new Border

export const createBorder = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Include cookies in the request
  };
  const response = await axios.post("/border/new", formData, config);

  return response.data;
};

// For Update Border
export const updateBorder = async (edit, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.put(`/borderer/${edit}`, formData, config);
  return response.data;
};

// Delete a broder 
export const deleteBorder = async (id) => {
  const config = {
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.delete(`/borderer/${id}`, config);
  return response.data;
};