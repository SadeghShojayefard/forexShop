import ProductBox from "@/components/share/ProductBox/ProductBox"
import SectionsTitle from "@/components/share/SectionsTitle/SectionsTitle"
import ShopButton from "../shopButton/ShopButton"
import { getTranslations } from "@/i18n/getTranslations";
import { getAllProductsForSite } from "@/helper/productAction";




export default async function ProductList({ locale }: { locale: string }) {
    const t = await getTranslations(locale);
    const latestProduct = await getAllProductsForSite("home");
    return (
        <>
            <div className="px-20 mx-auto">
                <SectionsTitle firstTitle={t("productTitle")} secondTitle={t("productText")} />
                <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-5  mt-5 w-full bg-transparent mb-12 '>

                    {
                        latestProduct.status === "success" && latestProduct.payload.data.map((item) => (
                            <ProductBox key={item.id} img={item.mainImage} productName={item.name} star={item.score}
                                user={item.userCount} price={locale === "fa" ? item.finalPriceToman : item.finalPriceTether}
                                linkText={t("moreDetailBtn")} locale={locale} href={item.shortName} discount={item.discount} />

                        ))
                    }
                </div>
                <div className="w-full flex flex-row justify-center items-center">
                    <ShopButton locale={locale} btnName={t("homeShopButton")} />
                </div>
            </div>
        </>
    )
}
