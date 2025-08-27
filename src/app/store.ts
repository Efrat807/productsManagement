import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productsList/productsSlice";
import selectedProductReducer from "../features/selectedProduct/selectedProductSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        selectedProduct: selectedProductReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;