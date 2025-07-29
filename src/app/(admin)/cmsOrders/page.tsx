
import AddOrderForm from "@/components/admin/orders/addOrder/AddOrderForm";
import OrderTable from "@/components/admin/orders/orderTable/OrderTable";
import Pagination from "@/components/share/pagination/Pagination";
export default function CmsOrdersPage() {


    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-2   py-5 
        shadow-2xl shadow-black rounded-2xl px-2 ">
            <b className="text-2xl font-bold w-full border-b pb-2">سفارش‌ها </b>
            <AddOrderForm />
            <OrderTable />
            <Pagination />
        </div>

    );
}
