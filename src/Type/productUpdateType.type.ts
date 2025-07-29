export type productUpdateType = {
    id: string;
    name: string;
    shortName: string;
    mainImage: string;
    slideImage: string[];
    metaTags: string;
    score: number;
    initPriceToman: number;
    initPriceTether: number;
    discount: number;
    finalPriceToman: number;
    finalPriceTether: number;
    indicatorFile: string;
    textFA: string;
    textEn: string;
    publishState: boolean;
}