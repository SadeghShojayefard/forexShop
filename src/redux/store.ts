import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        product: productSlice.reducer,
        order: orderSlice.reducer
    },
})

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
