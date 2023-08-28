import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addExpence, deleteExpence, getExpenceDetails, getExpences, updateExpence } from "../api/expenceAPI";


const initialState = {
  expneces: [],
  expenceCount: 0,
  resultPerPage: 0,
  isLoading: false,
  error: "",
  ownError: null,
};

// Async Thunks
// Get Expencess

export const fetchExpence = createAsyncThunk(
  "slice/fetchExpence",
  async ({ keyword, currentPage, price, catagory, ratings }) => {
    const expences = await getExpences(
      keyword,
      currentPage,
      price,
      catagory,
      ratings
    );
    return expences;
  }
);

// Get Expence Details

export const fetchExpenceDetails = createAsyncThunk(
  "slice/fetchExpenceDetails",
  async (expenceId) => {
    const expence = await getExpenceDetails(expenceId);
    return expence;
  }
);

// For adding single Expence
export const addNewExpnece = createAsyncThunk(
  "slice/addNewExpnece",
  async (formData, { rejectWithValue }) => {
    try {
      const expenceData = await addExpence(formData);
      return expenceData;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// For update a Expence
export const updateExpenceData = createAsyncThunk(
  "slice/updateExpenceData",
  async ({ expenceId, formData }, { rejectWithValue }) => {
    try {
      const updatedData = await updateExpence(expenceId, formData);
      return updatedData;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete A Expence

export const deleteExpenceData = createAsyncThunk(
  "slice/deleteExpenceData",
  async (expenceId, { rejectWithValue }) => {
    try {
      const response = await deleteExpence(expenceId); // Assuming you have a deleteBorder function from the previous response
      return response;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Slice

const inocmeSlice = createSlice({
  name: "expence",
  initialState,
  extraReducers: (builder) => {
    builder
      // Get expences
      .addCase(fetchExpence.pending, (state) => {
        state.isLoading = true;
        state.ownError = null;
      })
      .addCase(fetchExpence.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expences = action.payload.expences;
        state.expenceCount = action.payload.expenceCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.ownError = null;
      })
      .addCase(fetchExpence.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.expences = [];
        state.ownError = action?.payload?.message;
      })

      // Get a Single expence Details

      .addCase(fetchExpenceDetails.pending, (state) => {
        state.isLoading = true;
        state.ownError = null;
      })
      .addCase(fetchExpenceDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expence = action.payload.expence;
        state.ownError = null;
        state.ownError = null;
      })
      .addCase(fetchExpenceDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
        state.expence = {};
      })
      // Add expence
      .addCase(addNewExpnece.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewExpnece.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expence = action.payload;
        state.error = "";
        state.ownError = null;
      })
      .addCase(addNewExpnece.rejected, (state, action) => {
        state.isLoading = false;
        state.expence = null;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })

      // For update expence Data
      .addCase(updateExpenceData.pending, (state) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateExpenceData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = action.payload;
        state.error = false;
        state.ownError = false;
      })
      .addCase(updateExpenceData.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })
      // For delete a expence
      .addCase(deleteExpenceData.pending, (state) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteExpenceData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = action.payload;
        state.error = false;
        state.ownError = false;
      })
      .addCase(deleteExpenceData.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      });
  },
});

export default inocmeSlice.reducer;
