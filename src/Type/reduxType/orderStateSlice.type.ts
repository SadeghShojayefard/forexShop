import { ordersSliceType } from "./ordersSliceType.type";

export interface orderStateSlice {
    orders: ordersSliceType[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    loading: boolean;
    editOrder: Partial<ordersSliceType> | null;
    refreshData: boolean
}