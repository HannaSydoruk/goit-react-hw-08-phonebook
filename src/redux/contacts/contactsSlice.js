import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "services/api";

const initialState = {
    items: [],
    filter: '',
    isLoading: false,
}

export const fetchAll = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkApi) => {
        try {
            const contacts = await API.fetchContacts();
            return contacts;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkApi) => {
        try {
            const contacts = await API.deleteContact(contactId);
            return contacts;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contact, thunkApi) => {
        try {
            const newContact = await API.addContact(contact);
            return newContact;
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

const contactsSlice = createSlice({
    name: "contacts",
    initialState,

    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchAll.pending, (state, _) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchAll.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteContact.pending, (state, _) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(
                    contact => contact.id !== action.payload.id
                )
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(addContact.pending, (state, _) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = [...state.items, action.payload];
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
});


export const { setFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
