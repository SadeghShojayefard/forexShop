import { UserSliceType } from "./userType.type";

export interface UsersSliceState {
    users: UserSliceType[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    loading: boolean;
    userName: string;
    email: string;
    isCheckingUserName: boolean;
    isCheckingEmail: boolean;
    editUser: Partial<UserSliceType> | null; // برای مودال ویرایش
    refreshData: boolean;
}