import UserRolesForm from "@/components/admin/userRoles/userRolesForm/UserRolesForm";
import UserRolesTable from "@/components/admin/userRoles/userRolesTable/UserRolesTable";

export default function userRolesPage() {


    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-2   py-5 
        shadow-2xl shadow-black rounded-2xl px-2 ">
            <b className="text-2xl font-bold w-full border-b pb-2">سطح دسترسی کاربران</b>
            <UserRolesForm />
            <UserRolesTable />
        </div>

    );
}
