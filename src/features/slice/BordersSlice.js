import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getBordersDetails,
  getBorders,
  createBorder,
  updateBorder,
  deleteBorder,
} from "../api/bordersAPI";

const initialState = {
  borders: [],
  borderCount: 0,
  resultPerPage: 0,
  isLoading: false,
  error: "",
  ownError: null,
};

// Async Thunks
// Get Borders

export const fetchBorders = createAsyncThunk(
  "slice/fetchBorders",
  async ({ keyword, currentPage, price, catagory, ratings }) => {
    const borders = await getBorders(
      keyword,
      currentPage,
      price,
      catagory,
      ratings
    );
    return borders;
  }
);

// Get Borders Details

export const fetchBorderDetails = createAsyncThunk(
  "slice/fetchBorderDetails",
  async (id) => {
    const border = await getBordersDetails(id);
    return border;
  }
);

// For adding a new Border
export const addNewBorder = createAsyncThunk(
  "slice/addNewBorder",
  async (formData, { rejectWithValue }) => {
    try {
      const borderData = await createBorder(formData);
      return borderData;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// For update Border data
export const updateBorderData = createAsyncThunk(
  "slice/updateBorderData",
  async ({ edit, formData }, { rejectWithValue }) => {
    try {
      const updatedData = await updateBorder(edit, formData);
      return updatedData;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// For Delete a Border

export const deleteBorderData = createAsyncThunk(
  "slice/deleteBorderData",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteBorder(id); // Assuming you have a deleteBorder function from the previous response
      return response;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Slice

const borderSlice = createSlice({
  name: "border",
  initialState,
  extraReducers: (builder) => {
    builder
      // Get Border
      .addCase(fetchBorders.pending, (state) => {
        state.isLoading = true;
        state.ownError = null;
      })
      .addCase(fetchBorders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.borders = action.payload.borders;
        state.borderCount = action.payload.borderCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.ownError = null;
      })
      .addCase(fetchBorders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.borders = [];
        state.ownError = action?.payload?.message;
      })

      // Get a Single Border Details

      .addCase(fetchBorderDetails.pending, (state) => {
        state.isLoading = true;
        state.ownError = null;
      })
      .addCase(fetchBorderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.border = action.payload.border;
        state.ownError = null;
      })
      .addCase(fetchBorderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })
      // Add a new border
      .addCase(addNewBorder.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(addNewBorder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.border = action.payload.border;
        state.isSuccess = true;
        state.error = "";
        state.ownError = null;
      })
      .addCase(addNewBorder.rejected, (state, action) => {
        state.isLoading = false;
        state.border = null;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
        state.isSuccess = false;
      })
      // For update Border Data
      .addCase(updateBorderData.pending, (state) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateBorderData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = action.payload;
        state.error = false;
        state.ownError = false;
      })
      .addCase(updateBorderData.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })
      // For delete a border
      .addCase(deleteBorderData.pending, (state) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteBorderData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = action.payload;
        state.error = false;
        state.ownError = false;
      })
      .addCase(deleteBorderData.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      });
  },
});

export default borderSlice.reducer;
