import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productsReducer from "../features/productsList/productsSlice";
import selectedProductReducer from "../features/selectedProduct/selectedProductSlice";
import { loadState } from "./browserStorage";

const rootReducer = combineReducers({
    products: productsReducer,
    selectedProduct: selectedProductReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;