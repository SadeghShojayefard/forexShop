"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import EditModal from "../../modals/editModal/EditModal";
import EditModalInput from "../../modals/editModalInput/EditModalInput";
import { useEffect, useState } from "react";
import { getAllUsers, UserUpdateAction } from "@/helper/UserAction";
import { updateUserShema } from "@/validation/updateUserValidation";
import { Pen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers, updateEditUserField } from "@/redux/userSlice";
import { UserSliceType } from "@/Type/reduxType/userType.type";


export default function UsersTable() {

    const dispatch = useDispatch<AppDispatch>();
    const { users, pagination, loading, refreshData } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers({ page: 1, limit: 20 }));
    }, [dispatch, refreshData]);


    const updateUsers = () => {
        dispatch(fetchUsers({ page: pagination.page, limit: pagination.limit }));
    };

    const handleUpdateInputs = (id: string, value: string) => {
        dispatch(updateEditUserField({ field: id as keyof UserSliceType, value }));
    };
    return (
        <div className="w-full  flex flex-col justify-center items-center gap-2 
         text-start  pb-5 shadow-2xl shadow-black rounded-2xl px-2 mt-5 bg-transparent">
            <b className="w-full p-1 font-bold text-2xl">فهرست کاربران</b>
            <Table className="w-full shadow-lg shadow-black ">
                <TableHeader className=" shadow-lg shadow-black">
                    <TableRow  >
                        <TableHead className="text-right text-xl font-bold " >ردیف</TableHead>
                        <TableHead className="text-right text-xl font-bold" > آواتار</TableHead>
                        <TableHead className="text-right text-xl font-bold" >نام کاربری </TableHead>
                        <TableHead className="text-right text-xl font-bold" >ایمیل </TableHead>
                        <TableHead className="text-right text-xl font-bold" >نام و نام خانوادگی</TableHead>
                        <TableHead className="text-right text-xl font-bold" >نقش</TableHead>
                        <TableHead className="text-right text-xl font-bold" >تاریخ عضویت</TableHead>
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
                    ) : users != null && users.length > 0 ? (
                        users.map((item, index) => (
                            <TableRow key={item.id} className=" shadow-lg shadow-black hover:bg-cyan-900 hover:text-white ">
                                <TableCell className="font-medium ">{index + 1}</TableCell>
                                <TableCell>

                                    <Image
                                        src={`${item.avatar}`}
                                        width={50}
                                        height={50}
                                        alt="site-logo"
                                        className="rounded-full shadow shadow-black"
                                    />


                                </TableCell>
                                <TableCell>{item.username}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.role}</TableCell>
                                <TableCell>{new Date(item.createdAt).toLocaleString('fa')}</TableCell>

                                <TableCell className="flex flex-row flex-wrap justify-center items-center gap-2 ">


                                    {/* user update------------------------------------------------ */}

                                    <EditModal
                                        title="بروزرسانی کاربر'"
                                        text="لطفا اطلاعات جدید را وارد کنید."
                                        isUpdate={updateUsers}
                                        buttonText="بروزرسانی"
                                        action={UserUpdateAction}
                                        schema={updateUserShema()}
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
                                                    value={item.username}
                                                    placeholder="نام کاربری"
                                                    id="username"
                                                    fieldKey="username"
                                                    fields={fields}
                                                />
                                                <EditModalInput
                                                    inputType="email"
                                                    onUpdateInputs={handleUpdateInputs}
                                                    value={item.email}
                                                    placeholder="ایمیل کاربر"
                                                    id="email"
                                                    fieldKey="email"
                                                    fields={fields}
                                                />
                                                <EditModalInput
                                                    inputType="password"
                                                    onUpdateInputs={handleUpdateInputs}
                                                    value={""}
                                                    placeholder="رمز عبور"
                                                    id="password"
                                                    fieldKey="password"
                                                    fields={fields}
                                                />
                                                <EditModalInput
                                                    inputType="text"
                                                    onUpdateInputs={handleUpdateInputs}
                                                    value={item.name}
                                                    placeholder="نام"
                                                    id="name"
                                                    fieldKey="name"
                                                    fields={fields}
                                                />
                                                <EditModalInput
                                                    inputType="text"
                                                    onUpdateInputs={handleUpdateInputs}
                                                    value={""}
                                                    placeholder="آواتار"
                                                    id="avatar"
                                                    fieldKey="avatar"
                                                    fields={fields}
                                                />
                                                <div className="input-group">
                                                    <div className="w-full flex flex-row items-center border-2 border-transparent rounded-lg gap-1">
                                                        <Pen className="bg-transparent m-[1px]" />
                                                        <select id="role" className="input-style"
                                                            key={"role"}
                                                            name={fields.role.name}
                                                            defaultValue={item.role}>

                                                            <option value="admin" className='formButton'>admin</option>
                                                            <option value="user" className='formButton'>user</option>
                                                        </select>
                                                        {fields.publishState.errors &&
                                                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.publishState.errors}</p>
                                                        }
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </EditModal>


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
        </div >
    )
}

// username
// email
// password
// name
// avatar
// register date
// lock count
// is lock?
// date to finish lock
// date to reset wrong input