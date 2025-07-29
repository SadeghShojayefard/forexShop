import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import '@/style/site/signIn/signIn.css'
import { getRoles } from "@/helper/userRoleAction";

export default async function UserRolesTable() {

    // فراخوانی داده‌ها از سرور
    const { status, payload } = await getRoles();

    // اگر خطایی بود یا داده‌ای نبود، آرایه خالی نمایش بده
    const roles = status === 'success' ? payload : [];

    return (
        <div className="w-full  flex flex-col justify-center items-center gap-2 
         text-start  pb-5 shadow-2xl shadow-black rounded-2xl px-2 mt-5 bg-transparent">
            <b className="w-full p-1 font-bold text-2xl">جدول سطوح دسترسی</b>
            <Table className="w-full shadow-lg shadow-black ">
                <TableHeader className=" shadow-lg shadow-black">
                    <TableRow  >
                        <TableHead className="text-right text-xl font-bold " >ردیف</TableHead>
                        <TableHead className="text-right text-xl font-bold" >عنوان فارسی</TableHead>
                        <TableHead className="text-right text-xl font-bold" >عنوان انگلیسی</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {roles.length > 0 ? (
                        roles.map((role, index) => (
                            <TableRow key={role.id} className="shadow-lg shadow-black hover:bg-cyan-900 hover:text-white">
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{role.titleFA}</TableCell>
                                <TableCell>{role.titleEN}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                هیچ نقشی یافت نشد
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </div>
    )
}

