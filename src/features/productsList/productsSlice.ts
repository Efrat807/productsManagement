import { createSlice } from "@reduxjs/toolkit";
import type { IProduct } from "../../types";


const initialState: IProduct[] = [
    {
        id: 1,
        name: 'microwave',
        description: 'contains 2 buttons, menual',
        price: 400,
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        name: 'mixer',
        description: '15v strong and quite',
        price: 1000,
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        name: 'washerdishes',
        description: 'capability of 12 dishes',
        price: 2500,
        createdAt: new Date().toISOString(),
    }
];

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state: IProduct[], action: { payload: IProduct }) => {
            const id = state.length > 0 ? state[state.length - 1].id! + 1 : 1;
            state.push({ ...action.payload, id, createdAt: new Date().toISOString() });
        },
        deleteProduct: (state: IProduct[], action: { payload: number }) => {
            return state.filter(product => product.id !== action.payload);
        },
        updateProduct: (state: IProduct[], action: { payload: IProduct }) => {
            return state.map(product => product.id === action.payload.id ? action.payload : product);
        },
    }
});
export const { addProduct, deleteProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;