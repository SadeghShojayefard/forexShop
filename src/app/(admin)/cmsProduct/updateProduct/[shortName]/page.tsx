import UpdateProductForm from "@/components/admin/product/updateProductForm/UpdateProductForm";
import { getOneProduct } from "@/helper/productAction";


export default async function CmsUpdateProductPage({ params }: { params: { shortName: string } }) {

    const { shortName } = params;
    const { status, payload } = (await getOneProduct(shortName))!;
    const product = status === 'success' ? payload : [];



    // اگر خطایی بود یا داده‌ای نبود، آرایه خالی نمایش بده
    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-2   py-5 
           shadow-2xl shadow-black rounded-2xl px-2 ">
            <b className="text-2xl font-bold w-full border-b pb-2">بروزرسانی محصول</b>
            {
                !product || Array.isArray(product) ?
                    <div>محصولی یافت نشد</div>
                    :
                    <UpdateProductForm currentProductData={product.data} />
            }

        </div>

    );
}
