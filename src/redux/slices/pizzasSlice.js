import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasStatus', async (params) => {
        const {sortBy, order, category, search, currentPage} = params
        const itemsResp = await axios.get(`https://6391cf2db750c8d178ce0c12.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return itemsResp.data
    }
)

const initialState = {
    items: [],
    status: 'loading', // loading | success | error
}

const pizzasSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload
            state.status = 'success'
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error'
            state.items = []
        },
    }
});

export const { setItems,} = pizzasSlice.actions

export default pizzasSlice.reducer