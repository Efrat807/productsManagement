 import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IProduct } from '../../types';

 const selectedProductSlice = createSlice({
    name: 'selectedProduct',
    initialState: null as IProduct | null,
    reducers: {
        setSelectedProduct: (_, action: PayloadAction<IProduct | null>) => action.payload,
        resetSelectedProduct: () => null,
    }
});
    export const { setSelectedProduct, resetSelectedProduct } = selectedProductSlice.actions;
    export default selectedProductSlice.reducer;