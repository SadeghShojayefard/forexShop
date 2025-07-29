"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DetailModal from "../../modals/detailModal/DetailModal";
import { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import DeleteModal from "../../modals/deleteModal/DeleteModal";
import { changeReviewStateAction, DeleteMessageAction, getContactUs } from "@/helper/contactUsFormAction";
import { ContactUsTableInterFace } from "@/Type/interface/ContactUsTableInterFace";
import { productChangePublishStatueSchema } from "@/validation/productChangePublishStatueValidation";

export default function CantactUsTable() {


    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ContactUsTableInterFace[]>();
    const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 0 });

    const fetchData = async (page: number) => {
        const response = await getContactUs(page, 20);
        if (response.status === 'success') {
            setData(response.payload.data);
            setPagination(response.payload.pagination);
            setLoading(false);
        } else {
            setData([]);
            setPagination({ page: 1, limit: 20, total: 0, totalPages: 0 });
        }
    };

    useEffect(() => {
        fetchData(1); // صفحه اول رو لود کن
    }, []);

    const handlePageChange = () => {
        fetchData(pagination.page);
    };
    ///////// end get data ////////////////////
    const updateUsers = () => {
        /// update user function
    };

    const deleteFunction = () => {

    }

    // const handleUpdateInputs = (id: string, value: string) => {
    //     setContactDetail(prev => ({
    //         ...prev,
    //         [id]: value
    //     }));
    // }
    return (
        <div className="w-full  flex flex-col justify-center items-center gap-2 
         text-start  pb-5 shadow-2xl shadow-black rounded-2xl px-2 mt-5 bg-transparent">
            <Table className="w-full shadow-lg shadow-black ">
                <TableHeader className=" shadow-lg shadow-black">
                    <TableRow  >
                        <TableHead className="text-right text-xl font-bold " >ردیف</TableHead>
                        <TableHead className="text-right text-xl font-bold" >نام  </TableHead>
                        <TableHead className="text-right text-xl font-bold" >ایمیل</TableHead>
                        <TableHead className="text-right text-xl font-bold" >موبایل</TableHead>
                        <TableHead className="text-right text-xl font-bold" >تاریخ</TableHead>
                        <TableHead className="text-right text-xl font-bold" >وضعیت بررسی</TableHead>
                        <TableHead className="text-right text-xl font-bold" >متن</TableHead>
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
                    ) : data != null && data.length > 0 ? (
                        data.map((item, index) => (
                            <TableRow
                                key={item.id}
                                className="shadow-lg shadow-black hover:bg-cyan-900 hover:text-white"
                            >
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell dir="ltr" className="text-right">{item.date.toLocaleString('fa')}</TableCell>
                                <TableCell>
                                    {item.reviewState ? (
                                        <FaRegCircleCheck size={30} color="green" />
                                    ) : (
                                        <IoCloseCircleOutline size={30} color="red" />
                                    )}
                                </TableCell>
                                <TableCell>
                                    {
                                        item.reviewState ?
                                            (
                                                <DetailModal title={"مشاهده متن کامل"} action={null}   >
                                                    <p className="text-justify text-wrap">{item.message}</p>
                                                </DetailModal>
                                            )
                                            :
                                            (
                                                <DetailModal title={"مشاهده متن کامل"} action={{
                                                    action: changeReviewStateAction,
                                                    data: item.id,
                                                    onSuccess: handlePageChange
                                                }}  >
                                                    <p className="text-justify break-words whitespace-pre-wrap">{item.message}</p>
                                                </DetailModal>
                                            )
                                    }

                                </TableCell>
                                <TableCell className="flex flex-row flex-wrap justify-center items-center gap-2">

                                    <DeleteModal
                                        title={'حذف پیام'}
                                        text={'آیا می‌خواهید پیام انتخاب شده را حذف کنید؟'}
                                        buttonText={'حذف پیام'}
                                        itemId={item.id}
                                        action={DeleteMessageAction}
                                        schema={productChangePublishStatueSchema()}
                                        onSuccess={handlePageChange}
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center">
                                {'هیچ پیامی برای نمایش وجود ندارد.'}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </div>
    )
}

//نام و نام خانوادگی
// ایمیل
// شماره تماس
// متن پیام
