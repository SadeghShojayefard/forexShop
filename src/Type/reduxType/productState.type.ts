import { productOneSliceType } from "./productOneSliceType.type";
import { productSliceType } from "./productSliceType.type";

export interface productState {
    products: productSliceType[];
    product: productOneSliceType | undefined | null;
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    loading: boolean;
    initPriceToman: number,
    initPriceTether: number,
    discount: number,
    finalPriceToman: number,
    finalPriceTether: number,
    shortName: string,
    isCheckingShortName: boolean,
}