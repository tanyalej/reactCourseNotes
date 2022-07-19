import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
    items: [],
    quantity: 0, 
    changed: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartInitialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload
            const foundItemIndex = state.items.findIndex(item => item.id === newItem.id)
            const foundItem = state.items[foundItemIndex]
            state.quantity++
            state.changed = true

            if (foundItem) {
                foundItem.quantity++
                foundItem.totalPrice += foundItem.price
            } else {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    quantity: 1, 
                    totalPrice: newItem.price 
                })
            }
        },
        removeFromCart(state, action) {
            const foundItemIndex = state.items.findIndex(item => item.id === action.payload)
            const foundItem = state.items[foundItemIndex]
            state.quantity--
            state.changed = true

            if (foundItem.quantity === 1) {
                state.items.splice(foundItemIndex, 1)
            } else {
                foundItem.quantity--
                foundItem.totalPrice -= foundItem.price
            }
        },
        createCart(state, action) {
            state.items = action.payload.items
            state.quantity = action.payload.quantity
        },
        emptyCart() {}
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;