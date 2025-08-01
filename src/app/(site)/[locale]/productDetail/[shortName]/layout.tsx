
import { getProductMetaTag } from "@/helper/productAction";
import { array } from "zod";



export async function generateMetadata({ params }: { params:Promise< { shortName: string }> }) {
  const { shortName } = await params;
  const data = await getProductMetaTag(shortName);
  const metaTagsString = data?.payload?.data.metaTags;
  const metaTags = metaTagsString.split(",")
  const title = data?.payload?.data.title;


  return {
    title: title,
    keywords: ["اندیکاتور", "ترید", "فارکس", "اندیکاتور پرو", "ترند", "ایچیموکو",
      "ichimoku", "trend", "forox", 'trade', "Indicator Pro", ...(metaTags)]
  };
}



export default async function productDetailLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      {children}
    </>
  );
}





