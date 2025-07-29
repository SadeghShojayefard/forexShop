
import ProductTable from "@/components/admin/product/productTable/ProductTable";
import Pagination from "@/components/share/pagination/Pagination";
import Link from "next/link";

export default function CmsProductPage() {


    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-2   py-5 
           shadow-2xl shadow-black rounded-2xl px-2 ">
            <b className="text-2xl font-bold w-full border-b pb-2">محصولات </b>
            <div className="w-full justify-start mt-3">
                <Link href="/cmsProduct/addProduct" className="formButton" target="_blank">
                    ایجاد محصول جدید
                </Link>
            </div>
            <ProductTable />
            <Pagination />
        </div>

    );
}
