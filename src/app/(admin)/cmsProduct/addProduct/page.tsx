
import AddProductForm from "@/components/admin/product/addProductForm/AddProductForm";


export default function CmsAddProductPage() {


    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-2   py-5 
           shadow-2xl shadow-black rounded-2xl px-2 ">
            <b className="text-2xl font-bold w-full border-b pb-2">افزودن محصول جدید </b>
            <AddProductForm />
        </div>

    );
}
