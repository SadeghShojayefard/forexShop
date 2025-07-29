import { getAllOrders } from "@/helper/orderAction";
import { ordersSliceType } from "@/Type/reduxType/ordersSliceType.type";
import { orderStateSlice } from "@/Type/reduxType/orderStateSlice.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: orderStateSlice = {
    orders: [],
    pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    loading: true,
    editOrder: null,
    refreshData: true
};

export const fetchOrder = createAsyncThunk(
    'products/getAllOrder',
    async ({ page, limit }: { page: number; limit: number }) => {
        const response = await getAllOrders(page, limit);
        if (response.status === 'success') {
            return response.payload;
        }
        throw new Error('Failed to fetch users');
    }
);





let orderSlice = createSlice({
    name: "product",
    initialState,

    reducers: {
        setRefreshData: (state) => {
            state.refreshData = !state.refreshData;

        },
        updateEditOrderField: (
            state,
            action: PayloadAction<{ field: keyof ordersSliceType; value: string }>
        ) => {
            if (state.editOrder) {
                state.editOrder = {
                    ...state.editOrder,
                    [action.payload.field]: action.payload.value,
                };
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.orders = action.payload.data;
                state.pagination = action.payload.pagination;
                state.loading = false;
            })
            .addCase(fetchOrder.rejected, (state) => {
                state.orders = [];
                state.pagination = { page: 1, limit: 20, total: 0, totalPages: 0 };
                state.loading = false;
            })

        // .addCase(checkEmail.fulfilled, (state, action) => {

        //     if (action.payload.status === 'success') {
        //         state.isCheckingEmail = true;
        //     }
        //     else {
        //         state.isCheckingEmail = false;
        //     }
        // });
    },

})
export const
    {
        updateEditOrderField, setRefreshData
    } =
        orderSlice.actions;

export default orderSlice;
