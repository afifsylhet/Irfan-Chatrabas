import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addIncome,
  deleteIncome,
  getIncomeDetails,
  getIncomes,
  updateIncome,
} from "../api/incomeAPI";

const initialState = {
  incomes: [],
  incomeCount: 0,
  resultPerPage: 0,
  isLoading: false,
  error: "",
  ownError: null,
};

// Async Thunks
// Get incomes

export const fetchIncomes = createAsyncThunk(
  "slice/fetchIncomes",
  async ({ keyword, currentPage, price, catagory, ratings }) => {
    const incomes = await getIncomes(
      keyword,
      currentPage,
      price,
      catagory,
      ratings
    );
    return incomes;
  }
);

// Get Income Details

export const fetchIncomeDetails = createAsyncThunk(
  "slice/fetchIncomeDetails",
  async (id) => {
    const income = await getIncomeDetails(id);
    return income;
  }
);

// For adding single income
export const addNewIncome = createAsyncThunk(
  "slice/addNewIncome",
  async (formData, { rejectWithValue }) => {
    try {
      const incomeData = await addIncome(formData);
      return incomeData;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// For update a Income
export const updateIncomeData = createAsyncThunk(
  "slice/updateIncomeData",
  async ({ incomeId, formData }, { rejectWithValue }) => {
    try {
      const updatedData = await updateIncome(incomeId, formData);
      return updatedData;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete A Income

export const deleteIncomeData = createAsyncThunk(
  "slice/deleteIncomeData",
  async (incomeId, { rejectWithValue }) => {
    try {
      const response = await deleteIncome(incomeId); // Assuming you have a deleteBorder function from the previous response
      return response;
    } catch (error) {
      // If the request fails, return the error payload
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Slice

const inocmeSlice = createSlice({
  name: "income",
  initialState,
  extraReducers: (builder) => {
    builder
      // Get Incomes
      .addCase(fetchIncomes.pending, (state) => {
        state.isLoading = true;
        state.ownError = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.incomes = action.payload.incomes;
        state.incomeCount = action.payload.incomeCount;
        state.resultPerPage = action.payload.resultPerPage;
        state.ownError = null;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.incomes = [];
        state.ownError = action?.payload?.message;
      })

      // Get a Single income Details

      .addCase(fetchIncomeDetails.pending, (state) => {
        state.isLoading = true;
        state.ownError = null;
      })
      .addCase(fetchIncomeDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.income = action.payload.income;
        state.ownError = null;
        state.ownError = null;
      })
      .addCase(fetchIncomeDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
        state.income = {};
      })
      // Add income
      .addCase(addNewIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.income = action.payload;
        state.error = "";
        state.ownError = null;
      })
      .addCase(addNewIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.income = null;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })

      // For update Income Data
      .addCase(updateIncomeData.pending, (state) => {
        state.isLoading = true;
        state.isUpdated = false;
      })
      .addCase(updateIncomeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = action.payload;
        state.error = false;
        state.ownError = false;
      })
      .addCase(updateIncomeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isUpdated = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      })
      // For delete a income
      .addCase(deleteIncomeData.pending, (state) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteIncomeData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleted = action.payload;
        state.error = false;
        state.ownError = false;
      })
      .addCase(deleteIncomeData.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.error = action.error?.message;
        state.ownError = action?.payload?.message;
      });
  },
});

export default inocmeSlice.reducer;
