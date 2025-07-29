"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import EditModal from "../../modals/editModal/EditModal";
import EditModalInput from "../../modals/editModalInput/EditModalInput";
import { useEffect, useState } from "react";
import DeleteModal from "../../modals/deleteModal/DeleteModal";
import Toast
    from "@/components/share/toast/Toast";
import { DeleteOrderAction, getAllOrders, orderUpdateAction } from "@/helper/orderAction";
import { AddOrderSchema } from "@/validation/AddOrderValidation";
import { productChangePublishStatueSchema } from "@/validation/productChangePublishStatueValidation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOrder, updateEditOrderField } from "@/redux/orderSlice";
import { ordersSliceType } from "@/Type/reduxType/ordersSliceType.type";


export default function OrderTable() {
    const [usersDetail, setUsersDetail] = useState({});

    // const [loading, setLoading] = useState(true);
    // const [data, setData] = useState<any[]>();
    // const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });

    // const fetchData = async (page: number) => {
    //     const response = await getAllOrders(page, 20);
    //     if (response.status === 'success') {
    //         setData(response.payload.data);
    //         setPagination(response.payload.pagination);
    //         setLoading(false);
    //     } else {
    //         setData([]);
    //         setPagination({ page: 1, limit: 20, total: 0, totalPages: 0 });
    //     }
    // };

    // useEffect(() => {
    //     fetchData(1); // صفحه اول رو لود کن
    // }, []);

    // const handlePageChange = () => {
    //     fetchData(pagination.page);
    // };



    const dispatch = useDispatch<AppDispatch>();
    const { orders, pagination, loading, refreshData } = useSelector((state: RootState) => state.order);

    const handlePageChange = () => {
        dispatch(fetchOrder({ page: 1, limit: 20 }));
    };
    useEffect(() => {
        dispatch(fetchOrder({ page: 1, limit: 20 }));
    }, [dispatch, refreshData]);


    const updateOrders = () => {
        /// update user function
        dispatch(fetchOrder({ page: 1, limit: 20 }));
    };

    const handleUpdateInputs = (id: string, value: string) => {
        dispatch(updateEditOrderField({ field: id as keyof ordersSliceType, value }));
    };
    return (
        <>

            <div className="w-full  flex flex-col justify-center items-center gap-2 
         text-start  pb-5 shadow-2xl shadow-black rounded-2xl px-2 mt-5  bg-transparent">
                <div className="w-full text-right font-bold text-xl mt-1 mr-1">جدول فاکتورها</div>
                <Table className="w-full shadow-lg shadow-black ">
                    <TableHeader className=" shadow-lg shadow-black">
                        <TableRow  >
                            <TableHead className="text-right text-xl font-bold " >ردیف</TableHead>
                            <TableHead className="text-right text-xl font-bold" >نام کاربری </TableHead>
                            <TableHead className="text-right text-xl font-bold" >نام محصول </TableHead>
                            <TableHead className="text-right text-xl font-bold" >تعداد</TableHead>
                            <TableHead className="text-right text-xl font-bold" >قیمت</TableHead>
                            <TableHead className="text-right text-xl font-bold" >مجموع</TableHead>
                            <TableHead className="text-right text-xl font-bold" >تاریخ</TableHead>
                            <TableHead className="text-center text-xl font-bold" >عملیات‌ها</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    در حال بارگذاری...
                                </TableCell>
                            </TableRow>
                        ) : orders != null && orders.length > 0 ? (
                            orders.map((item, index) => (
                                <TableRow key={item.id} className=" shadow-lg shadow-black hover:bg-cyan-900 hover:text-white ">
                                    <TableCell className="font-medium ">{index + 1}</TableCell>
                                    <TableCell>{item.user}</TableCell>
                                    <TableCell>{item.product}</TableCell>
                                    <TableCell>{item.count}</TableCell>
                                    <TableCell>
                                        {Number(item.price).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {Number(item.totalPrice).toLocaleString()}
                                    </TableCell>

                                    <TableCell>

                                        {new Date(item.createdAt).toLocaleString('fa')}
                                    </TableCell>

                                    <TableCell className="flex flex-row flex-wrap justify-center items-center gap-2 ">


                                        {/* orders update------------------------------------------------ */}

                                        <EditModal
                                            title="ویرایش فاکتور"
                                            text="لطفا در صورت نیاز فاکتور مورد نظر را ویرایش کنید."
                                            isUpdate={updateOrders}
                                            buttonText="ویرایش فاکتور"
                                            action={orderUpdateAction}
                                            schema={AddOrderSchema()}
                                        >
                                            {(fields) => (
                                                <>
                                                    <EditModalInput
                                                        inputType="hidden"
                                                        onUpdateInputs={handleUpdateInputs}
                                                        value={item.id}
                                                        placeholder=""
                                                        id="id"
                                                        fieldKey="id"
                                                        fields={fields}
                                                    />
                                                    <EditModalInput
                                                        inputType="text"
                                                        onUpdateInputs={handleUpdateInputs}
                                                        value={item.user}
                                                        placeholder="نام کاربری"
                                                        id="username"
                                                        fieldKey="username"
                                                        fields={fields}
                                                    />
                                                    <EditModalInput
                                                        inputType="text"
                                                        onUpdateInputs={handleUpdateInputs}
                                                        value={item.product}
                                                        placeholder="نام محصول"
                                                        id="product"
                                                        fieldKey="product"
                                                        fields={fields}
                                                    />
                                                    <EditModalInput
                                                        inputType="number"
                                                        onUpdateInputs={handleUpdateInputs}
                                                        value={item.count.toString()}
                                                        placeholder="تعداد محصول"
                                                        id="count"
                                                        fieldKey="count"
                                                        fields={fields}
                                                    />
                                                </>
                                            )}
                                        </EditModal>

                                        {/* delete fuctor------------------------------------------------ */}
                                        <DeleteModal
                                            title={"حذف فاکتور"}
                                            text={"آیا می خواهید این فاکتور را حذف کنید؟"}
                                            buttonText={"حذف فاکتور"}
                                            itemId={item.id}
                                            action={DeleteOrderAction}
                                            schema={productChangePublishStatueSchema()}
                                            onSuccess={handlePageChange}
                                        />


                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">
                                    {'هیچ فاکتوری برای نمایش وجود ندارد.'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </div>
        </>
    )
}
