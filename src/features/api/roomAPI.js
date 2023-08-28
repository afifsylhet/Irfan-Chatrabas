import axios from "../../utils/axios";

// Get All Room
export const getRooms = async (
  keyword = "",
  currentPage = 1,
  catagory = ""
) => {

  const config = {
    withCredentials: true, // Include cookies in the request
  };

  let link = `/admin/rooms?keyword=${keyword}&page=${currentPage}`;

  if (catagory) {
    link = `/admin/rooms?keyword=${keyword}&page=${currentPage}&catagory=${catagory}`;
  }

  const response = await axios.get(link, config );

  return response.data;
};

// Get Single Room Details
export const getRoomDetails = async (id) => {
  const config = {
    withCredentials: true, // Include cookies in the request
  };
  const response = await axios.get(`/room/${id}`, config);

  return response.data;
};

// Post single Room

export const addRoom = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.post("/room/new", formData, config);
  return response.data;
};

// Update Single Room

export const updateRoom = async (roomId, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.put(`/admin/room/${roomId}`, formData, config);
  return response.data;
};

// Delete an Room
export const deleteRoom = async (roomId) => {
  const config = {
    withCredentials: true, // Include cookies in the request
  };

  const response = await axios.delete(`/admin/room/${roomId}`, config);
  return response.data;
};