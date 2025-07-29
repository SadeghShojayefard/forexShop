import ProductBox from "@/components/share/ProductBox/ProductBox";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react"
import { getTranslations } from "@/i18n/getTranslations";
import { getAllProductsForSite } from "@/helper/productAction";


export default async function storPage({ params }: { params: { locale: string } }) {
    const { locale } = await params;
    const t = await getTranslations(locale);
    const latestProduct = await getAllProductsForSite("stor");

    return (
        <div className="w-full  flex flex-col flex-wrap justify-center items-start gap-5 px-20 text-start my-20  ">
            <div className="w-full flex flex-row justify-start items-center">
                <Breadcrumb className="font-bold ">
                    <BreadcrumbList className=" bg-white/30 backdrop-blur-2xl py-1 px-2 rounded-2xl">
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/${locale}`} >{t("home")}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {locale === "fa" ?
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            :
                            <BreadcrumbSeparator />
                        }

                        <BreadcrumbItem>
                            <BreadcrumbPage>{t("store")}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <h3 className="font-extrabold text-2xl">  {t("store")}</h3>
            <div className=" w-full grid grid-cols-4 gap-7  ">

                {
                    latestProduct.status === "success" && latestProduct.payload.data.map((item) => (
                        <div key={item.id} className="sm:col-span-2 md:col-span-1">
                            <ProductBox img={item.mainImage} productName={item.name} star={item.score}
                                user={item.userCount} price={locale === "fa" ? item.finalPriceToman : item.finalPriceTether}
                                linkText={t("moreDetailBtn")} locale={locale} href={item.shortName} discount={item.discount} />
                        </div>
                    ))
                }

            </div>

        </div>
    );
}
