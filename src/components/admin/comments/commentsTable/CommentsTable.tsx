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
import EditModal from "../../modals/editModal/EditModal";
import EditModalInput from "../../modals/editModalInput/EditModalInput";
import { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { IoMdHeartDislike } from "react-icons/io";
import DeleteModal from "../../modals/deleteModal/DeleteModal";
import Toast
    from "@/components/share/toast/Toast";
import { commentUpdateAction } from "@/helper/sendCommentAction";
import { sendCommentSchema } from "@/validation/sendCommentValidation";
import { commentUpdateSchema } from "@/validation/commentUpdateValidation";
export default function CommentsTable() {
    const [usersDetail, setUsersDetail] = useState({});

    const [isShowToast, setIsShowToast] = useState(false);
    const [toastText, setToastText] = useState("");

    const showToast = (text: string) => {
        setToastText(text);
        setIsShowToast(true);
        setTimeout(() => {
            setIsShowToast(false);
        }, 3000);
    }


    const comments = [
        {
            id: "1",
            userName: "admin",
            productName: "trendLine",
            commentText: `سلام چطوری؟ سلام چطوری؟ سلام چطوری؟ سلام چطوری؟ سلام چطوری؟ سلام چطوری؟ سلام چطوری؟ سلام چطوری؟ سلام چطوری؟
            سلام چطوری؟ سلام چطوری؟ سلام چطوری؟ سلام چطوری؟`,
            date: '1404/2/30 | 22:44:12',
            isRead: true,
            isBisti: true,
        },
        {
            id: "2",
            userName: "admin",
            productName: "trendLine",
            commentText: "سلام چطوری؟",
            date: '1404/2/30 | 22:44:12',
            isRead: false,
            isBisti: true,
        }, {
            id: "3",
            userName: "admin",
            productName: "trendLine",
            commentText: "سلام چطوری؟",
            date: '1404/2/30 | 22:44:12',
            isRead: true,
            isBisti: false,
        }, {
            id: "4",
            userName: "admin",
            productName: "trendLine",
            commentText: "سلام چطوری؟",
            date: '1404/2/30 | 22:44:12',
            isRead: true,
            isBisti: true,
        }, {
            id: "5",
            userName: "admin",
            productName: "trendLine",
            commentText: "سلام چطوری؟",
            date: '1404/2/30 | 22:44:12',
            isRead: false,
            isBisti: false,

        }, {
            id: "6",
            userName: "admin",
            productName: "trendLine",
            commentText: "سلام چطوری؟",
            date: '1404/2/30 | 22:44:12',
            isRead: true,
            isBisti: false,
        },

    ];
    const updateUsers = () => {
        /// update user function
        showToast("سلام چطوری؟");
    };

    const deleteFunction = () => {
        showToast("سلام چطوری؟");
    }
    const handleUpdateInputs = (id: string, value: string) => {
        setUsersDetail(prev => ({
            ...prev,
            [id]: value
        }));
    }
    return (
        <>
            {/* /////////////// error box /////////////////////////////// */}
            {isShowToast && <Toast text={toastText} />}


            <div className="w-full  flex flex-col justify-center items-center gap-2 
         text-start  pb-5 shadow-2xl shadow-black rounded-2xl px-2 mt-5 bg-transparent">
                <Table className="w-full shadow-lg shadow-black ">
                    <TableHeader className=" shadow-lg shadow-black">
                        <TableRow  >
                            <TableHead className="text-right text-xl font-bold " >ردیف</TableHead>
                            <TableHead className="text-right text-xl font-bold" >نام کاربری </TableHead>
                            <TableHead className="text-right text-xl font-bold" >نام محصول </TableHead>
                            <TableHead className="text-right text-xl font-bold" >تاریخ</TableHead>
                            <TableHead className="text-right text-xl font-bold" >وضعیت بررسی</TableHead>
                            <TableHead className="text-right text-xl font-bold" >نظر برتر</TableHead>
                            <TableHead className="text-right text-xl font-bold" >متن</TableHead>
                            <TableHead className="text-center text-xl font-bold" >عملیات‌ها</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {comments.map((item) => (
                            <TableRow key={item.id} className=" shadow-lg shadow-black hover:bg-cyan-900 hover:text-white ">
                                <TableCell className="font-medium ">{item.id}</TableCell>
                                <TableCell>{item.userName}</TableCell>
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>
                                    {item.isRead ?
                                        <FaRegCircleCheck size={30} color="green" />
                                        :
                                        <IoCloseCircleOutline size={30} color="red" />
                                    }
                                </TableCell>
                                <TableCell>
                                    {item.isBisti ?
                                        <FcLike size={30} color="red" />
                                        :
                                        <IoMdHeartDislike size={30} color="black" />
                                    }
                                </TableCell>

                                <TableCell>
                                    <DetailModal title="مشاهده متن کامل" action={null}>
                                        <p className="text-justify text-wrap">
                                            {item.commentText}
                                        </p>
                                    </DetailModal>
                                </TableCell>

                                <TableCell className="flex flex-row flex-wrap justify-center items-center gap-2 ">

                                    {/* user detail------------------------------------------------ */}

                                    {/* user update------------------------------------------------ */}

                                    <EditModal
                                        title="ویرایش پاسخ"
                                        text="لطفا در صورت نیاز نظر انتخاب شده را ویرایش کنید."
                                        isUpdate={updateUsers}
                                        buttonText="ویرایش پاسخ"
                                        action={commentUpdateAction}
                                        schema={commentUpdateSchema()}
                                    >
                                        {(fields) => (
                                            <>
                                                <EditModalInput
                                                    inputType="hidden"
                                                    onUpdateInputs={handleUpdateInputs}
                                                    value={"usernameId"}
                                                    placeholder=""
                                                    id="id"
                                                    fieldKey="id"
                                                    fields={fields}
                                                />
                                                <EditModalInput
                                                    inputType="textarea"
                                                    onUpdateInputs={handleUpdateInputs}
                                                    value={item.commentText}
                                                    placeholder="لطفا متن نظر را بنویسید."
                                                    id="text"
                                                    fieldKey="text"
                                                    fields={fields}
                                                />

                                            </>
                                        )}
                                    </EditModal>

                                    {/* user lock------------------------------------------------ */}

                                    {/* like of dis like------------------------------------------------ */}
                                    {/* {item.isBisti ?
                                        <DeleteModal title="نظر برتر " text="آیا می خواهید این کامنت را از اسلاید شو نظرات برتر حذف کنید؟"
                                            buttonText="dislike"
                                            deleteFunction={deleteFunction} action={null} /> :
                                        <DeleteModal title="نظر برتر " text="آیا می خواهید این نظر به عنوان کامنت برتر در اسلاید شو صفحه اصلی قرار گیرد؟"
                                            buttonText="like"
                                            deleteFunction={deleteFunction} />} */}


                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>
        </>
    )
}

//اسم کاربر
// محصول
// نظر
// تاریخ
// ساعت
// عملیات
