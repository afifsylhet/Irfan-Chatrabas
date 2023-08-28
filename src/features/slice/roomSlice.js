import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addRoom,
  deleteRoom,
  getRoomDetails,
  getRooms,
  updateRoom,
} from "../api/roomAPI";

const initialState = {
  rooms: [],
  room:{},
  roomCount: 0,
  resultPerPage: 0,
  isLoading: false,
  error: "",
  ownError: null,
};

// Async Thunks
// Get Rooms

export const fetchRooms = createAsyncThunk(
  "slice/fetchRooms",
  async ({ keyword, currentPage, price, catagory, ratings }) => {
    const rooms = await getRooms(
      keyword,
      currentPage,
      price,
      catagory,
      ratings
    );
    return rooms;
  }
);

// Get Room Details

export const fetchRoomDetails = createAsyncThunk(
  "slice/fetchRoomDetails",
  async (id) => {
    const room = await getRoomDetails(id);
    return room;
  }
);

// For adding single room
export const addNewRoom = createAsyncThunk(
  "slice/addNewRoom",
  async (formData, { rejectWithValue }) => {
    try {
      const roomData = await addRoom(formData);
      return roomData;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// For update a Room
export const updateRoomData = createAsyncThunk(
  "slice/updateRoomData",
  async ({ roomId, formData }, { rejectWithValue }) => {
    try {
      const updatedData = await updateRoom(roomId, formData);
      return updatedData;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete A Room

export const deleteRoomData = createAsyncThunk(
  "slice/deleteRoomData",
  async (roomId, { rejectWithValue }) => {
    try {
      const response = await deleteRoom(roomId); // Assuming you have a deleteBorder function from the previous response
      return response;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Slice

const roomSlice = createSlice({
  name: "room",
  initialState,
  extraReducers: (builder) => {
    builder
      // Get Rooms
      .addCase(fetchRooms.pending, (state) => {
        state.isLoading = true;
        state.ownError = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = action.payload.rooms;
        state.roomCount = action.payload.roomCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.ownError = null;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.rooms = [];
        state.ownError = action?.payload?.message;
      })

      // Get a Single Room Details

      .addCase(fetchRoomDetails.pending, (state) => {
        state.isLoading = true;
        state.ownError = null;
      })
      .addCase(fetchRoomDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.room = action.payload.room;
        state.ownError = null;
        state.ownError = null;
      })
      .addCase(fetchRoomDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
        state.room = {};
      })
      // Add Room
      .addCase(addNewRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.room = action.payload;
        state.error = "";
        state.ownError = null;
      })
      .addCase(addNewRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.room = null;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })

      // For update Room Data
      .addCase(updateRoomData.pending, (state) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateRoomData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = action.payload;
        state.error = false;
        state.ownError = false;
      })
      .addCase(updateRoomData.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })
      // For delete a Room
      .addCase(deleteRoomData.pending, (state) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteRoomData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = action.payload;
        state.error = false;
        state.ownError = false;
      })
      .addCase(deleteRoomData.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      });
  },
});

export default roomSlice.reducer;
