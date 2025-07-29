import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUsers, checkUserNameExistAction, checkEmailExistAction } from '@/helper/UserAction';
import { UsersSliceState } from '@/Type/reduxType/userState.type';
import { UserSliceType } from '@/Type/reduxType/userType.type';






const initialState: UsersSliceState = {
    users: [],
    pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    loading: true,
    userName: '',
    email: '',
    isCheckingUserName: true,
    isCheckingEmail: true,
    editUser: null,
    refreshData: true,
};

// Async Thunk برای گرفتن لیست کاربران
export const fetchUsers = createAsyncThunk(
    'users/getAllUsers',
    async ({ page, limit }: { page: number; limit: number }) => {
        const response = await getAllUsers(page, limit);
        if (response.status === 'success') {
            return {
                ...response.payload,
                data: response.payload.data.map((user: any) => ({
                    ...user,
                    createdAt: new Date(user.createdAt).toISOString(), // تبدیل به string
                })),
            };
        }
        throw new Error('Failed to fetch users');
    }
);


// Async Thunk برای چک کردن نام کاربری
export const checkUserName = createAsyncThunk(
    'users/checkUserName',
    async (userName: string) => {
        const result = await checkUserNameExistAction(userName);

        return result;
    }
);

// Async Thunk برای چک کردن ایمیل
export const checkEmail = createAsyncThunk(
    'users/checkEmail',
    async (email: string) => {
        const result = await checkEmailExistAction(email);
        console.log(result);
        return result;
    }
);


let userSlice = createSlice({
    name: "users",
    initialState,

    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.userName = action.payload;

        },
        setRefreshData: (state) => {
            state.refreshData = !state.refreshData;

        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setEditUser: (state, action: PayloadAction<Partial<UserSliceType> | null>) => {
            state.editUser = action.payload;
        },
        updateEditUserField: (
            state,
            action: PayloadAction<{ field: keyof UserSliceType; value: string }>
        ) => {
            if (state.editUser) {
                state.editUser = {
                    ...state.editUser,
                    [action.payload.field]: action.payload.value,
                };
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload.data;
                state.pagination = action.payload.pagination;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.users = [];
                state.pagination = { page: 1, limit: 20, total: 0, totalPages: 0 };
                state.loading = false;
            })
            .addCase(checkUserName.fulfilled, (state, action) => {


                if (action.payload.status === 'success') {
                    state.isCheckingUserName = true;
                }
                else {
                    state.isCheckingUserName = false;
                }

            })
            .addCase(checkEmail.fulfilled, (state, action) => {

                if (action.payload.status === 'success') {
                    state.isCheckingEmail = true;
                }
                else {
                    state.isCheckingEmail = false;
                }
            });
    },

})
export const { setUserName, setEmail, setEditUser, updateEditUserField, setRefreshData } =
    userSlice.actions;
export default userSlice;
