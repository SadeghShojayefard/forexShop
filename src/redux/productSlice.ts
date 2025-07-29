import { checkNameAction, checkShortNameAction, getAllProducts, getOneProduct } from "@/helper/productAction";
import { productState } from "@/Type/reduxType/productState.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: productState = {
    products: [],
    product: null,
    pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    loading: true,
    initPriceToman: 0,
    initPriceTether: 0,
    discount: 0,
    finalPriceToman: 0,
    finalPriceTether: 0,
    shortName: '',
    isCheckingShortName: true,
};

export const fetchProduct = createAsyncThunk(
    'products/getAllProduct',
    async ({ page, limit }: { page: number; limit: number }) => {
        const response = await getAllProducts(page, limit);
        if (response.status === 'success') {
            return response.payload;
        }
        throw new Error('Failed to fetch users');
    }
);

export const checkShortName = createAsyncThunk(
    'product/checkShortName',
    async (shortName: string) => {
        const result = await checkShortNameAction(shortName);

        return result;
    }
)

export const checkName = createAsyncThunk(
    'product/checkName',
    async (name: string) => {
        const result = await checkNameAction(name);

        return result;
    }
)



let productSlice = createSlice({
    name: "product",
    initialState,

    reducers: {
        setShortName: (state, action: PayloadAction<string>) => {
            state.shortName = action.payload;
        },
        setInitPriceToman: (state, action: PayloadAction<number>) => {
            state.initPriceToman = action.payload;
        },
        setInitPriceTether: (state, action: PayloadAction<number>) => {
            state.initPriceTether = action.payload;
        },
        setDiscount: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },
        setFinalPriceToman: (state, action: PayloadAction<number>) => {
            state.finalPriceToman = action.payload;

        },
        setFinalPriceTether: (state, action: PayloadAction<number>) => {
            state.finalPriceTether = action.payload;
        },

        // setRefreshData: (state) => {
        //     state.refreshData = !state.refreshData;

        // },
        // setEmail: (state, action: PayloadAction<string>) => {
        //     state.email = action.payload;
        // },
        // setEditUser: (state, action: PayloadAction<Partial<UserSliceType> | null>) => {
        //     state.editUser = action.payload;
        // },
        // updateEditUserField: (
        //     state,
        //     action: PayloadAction<{ field: keyof UserSliceType; value: string }>
        // ) => {
        //     if (state.editUser) {
        //         state.editUser = {
        //             ...state.editUser,
        //             [action.payload.field]: action.payload.value,
        //         };
        //     }
        // },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.products = action.payload.data;
                state.pagination = action.payload.pagination;
                state.loading = false;
            })
            .addCase(fetchProduct.rejected, (state) => {
                state.products = [];
                state.pagination = { page: 1, limit: 20, total: 0, totalPages: 0 };
                state.loading = false;
            })
            .addCase(checkShortName.fulfilled, (state, action) => {
                if (action.payload.status === 'success') {
                    state.isCheckingShortName = true;
                }
                else {
                    state.isCheckingShortName = false;
                }

            })
            .addCase(checkName.fulfilled, (state, action) => {
                if (action.payload.status === 'success') {
                    state.isCheckingShortName = true;
                }
                else {
                    state.isCheckingShortName = false;
                }

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
        setShortName,
        setInitPriceToman,
        setInitPriceTether,
        setDiscount,
        setFinalPriceToman,
        setFinalPriceTether,
    } =
        productSlice.actions;

export default productSlice;
