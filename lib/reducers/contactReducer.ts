import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ENDPOINTS } from '../constants';

interface ContactState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

const initialState: ContactState = {
  isSubmitting: false,
  isSubmitted: false,
  error: null,
};

export const submitContact = createAsyncThunk(
  'contact/submit',
  async (data: { name: string; email: string; message: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_ENDPOINTS.CONTACT, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit contact form');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContact: (state) => {
      state.isSubmitted = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSubmitted = true;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer; 