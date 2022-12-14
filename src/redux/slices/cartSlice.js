import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addItem(state, action) {
        //     state.items.push(action.payload)
        //     state.totalPrice = state.items.reduce((sum, obj) => {
        //         return sum + obj.price
        //     }, 0)
        // },

        addItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            // const findItem = state.items.find((obj) => obj.type === action.payload.type)
            if (findItem){
                findItem.count++
            }else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return sum + (obj.price * obj.count)
            }, 0)
        },

        minusItem(state, action){
            const findItem = state.items.find((obj) => obj.id === action.payload)
            if (findItem) {
                findItem.count--
                state.totalPrice = state.items.reduce((sum, obj) => {
                    return sum + (obj.price * obj.count)
                }, 0)
                if (findItem.count <= 0){
                    state.items = state.items.filter(obj => obj.id !== action.payload)
                }
            }
        },

        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },

        clearItems(state, action) {
            state.items = []
            state.totalPrice = 0
        }
    }

});

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) => state.cart.items.find(obj => obj.id === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer