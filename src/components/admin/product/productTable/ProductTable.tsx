"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
// import { useState } from "react";
import DeleteModal from "../../modals/deleteModal/DeleteModal";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts, PublishChange } from "@/helper/productAction";
import { productChangePublishStatueSchema } from "@/validation/productChangePublishStatueValidation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchData } from "next-auth/client/_utils";
import { fetchProduct } from "@/redux/productSlice";


export default function ProductTable() {


    // const [loading, setLoading] = useState(true);
    // const [data, setData] = useState<any[]>();
    // const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });

    // const fetchData = async (page: number) => {
    //     const response = await getAllProducts(page, 20);
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

    const handlePageChange = () => {
        dispatch(fetchProduct({ page: 1, limit: 20 }));
    };

    const dispatch = useDispatch<AppDispatch>();
    const { products, pagination, loading } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(fetchProduct({ page: 1, limit: 20 }));
    }, [dispatch]);


    // const updateUsers = () => {
    //     dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit }));
    // };


    return (
        <>
            {/* /////////////// error box /////////////////////////////// */}
            {/* {isShowToast && <Toast text={toastText} />} */}


            <div className="w-full  flex flex-col justify-center items-center gap-2 
         text-start  pb-5 shadow-2xl shadow-black rounded-2xl px-2 mt-5  bg-transparent">
                <div className="w-full text-right font-bold text-xl mt-1 mr-1">جدول فاکتورها</div>
                <Table className="w-full shadow-lg shadow-black ">
                    <TableHeader className=" shadow-lg shadow-black">
                        <TableRow  >
                            <TableHead className="text-right text-xl font-bold " >ردیف</TableHead>
                            <TableHead className="text-right text-xl font-bold" >تصویر </TableHead>
                            <TableHead className="text-right text-xl font-bold" >نام محصول </TableHead>
                            <TableHead className="text-right text-xl font-bold" >قیمت تومان</TableHead>
                            <TableHead className="text-right text-xl font-bold" >قیمت تتر</TableHead>
                            <TableHead className="text-right text-xl font-bold" >امتیاز</TableHead>
                            <TableHead className="text-right text-xl font-bold" >وضعیت انتشار</TableHead>
                            <TableHead className="text-center text-xl font-bold" >عملیات‌ها</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>






                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">
                                    در حال بارگذاری...
                                </TableCell>
                            </TableRow>
                        ) : products != null && products.length > 0 ? (
                            products.map((item, index) => (
                                <TableRow key={item.id} className=" shadow-lg shadow-black hover:bg-cyan-900 hover:text-white ">
                                    <TableCell className="font-medium ">{index + 1}</TableCell>
                                    <TableCell>
                                        <Image
                                            src={item.mainImage}
                                            width={50}
                                            height={50}
                                            alt={item.mainImage}
                                            className="rounded-md shadow shadow-black"
                                        />

                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        {Number(item.finalPriceToman).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {Number(item.finalPriceTether).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        {item.score}
                                    </TableCell>
                                    <TableCell >
                                        {item.publishState === true ?
                                            <span className="bg-sky-400 rounded-xl p-2 ">انتشار</span>
                                            :
                                            <span className="bg-cyan-700 rounded-xl p-2 text-white ">پیش نویس</span>
                                        }
                                    </TableCell>
                                    <TableCell className="flex flex-row flex-wrap justify-center items-center gap-2 ">

                                        {/* user detail------------------------------------------------ */}

                                        {/* user update------------------------------------------------ */}


                                        <Link href={`/cmsProduct/updateProduct/${item.shortName}`} className="formButton" target="_blank">
                                            بروزرسانی
                                        </Link>
                                        <Link href={`/cmsProduct/Preview/${item.shortName}`} className="formButton" target="_blank">
                                            پیش نمایش
                                        </Link>

                                        {/* user lock------------------------------------------------ */}

                                        {/* delete fuctor------------------------------------------------ */}

                                        {/* <DeleteModal title="حذف محصول" text="آیا می خواهید این محصول را حذف کنید؟"
                                        buttonText="حذف محصول"
                                        customFunction={PublishChange(item.id)} />
 */}

                                        <DeleteModal
                                            title="تغییر محصول"
                                            text="آیا می‌خواهید محصول را تغییر دهید؟"
                                            buttonText="تغییر وضعیت انتشار"
                                            itemId={item.id}
                                            action={PublishChange}
                                            schema={productChangePublishStatueSchema()}
                                            onSuccess={handlePageChange}
                                        />

                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">
                                    {'هیچ محصولی برای نمایش وجود ندارد.'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </div>
        </>
    )
}
