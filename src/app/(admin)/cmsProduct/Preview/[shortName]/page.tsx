import DefinitionSection from "@/components/site/productDetail/definitionSection/DefinitionSection";
import DetailSection from "@/components/site/productDetail/detailSection/DetailSection";
import { getOneProduct } from "@/helper/productAction";
import { getTranslations } from "@/i18n/getTranslations";

// تعریف تایپ برای props

// تابع صفحه
export default async function CmsProductPreviewPage({ params }: PageProps) {
  const { shortName } = params; //  'await' را حذف کنید

    const t = await getTranslations("fa");
    const productData = await getOneProduct(shortName);
    const pData = productData?.payload?.data;
    const slides = pData?.slideImage || []; // اطمینان از اینکه slides یک آرایه است، حتی اگر pData?.slideImage وجود نداشته باشد
    if (pData?.mainImage) {
        slides.push(pData?.mainImage);
    }
    slides.reverse();

  return (
    <div
      className="w-full h-full flex flex-col justify-start items-center gap-2 py-5 
         shadow-2xl shadow-black rounded-2xl px-2"
    >
      <b className="text-2xl font-bold w-full border-b pb-2">پیش نمایش محصول</b>
      <DetailSection
        productName={pData.name}
        user={pData.userCount}
        star={pData.score}
        price={pData.finalPriceToman}
        href={pData.indicatorFile}
        img={slides}
        locale="fa"
        discount={pData.discount}
      />
      <DefinitionSection
        title={t("definition")}
        bit64={t("64bit")}
        text={pData.textFA}
        locale="fa"
      />
    </div>
  );
}
