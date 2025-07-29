
import DeleteOffForm from "@/components/admin/offs/deleteOffForm/DeleteOffForm";
import AddOffForm from "@/components/admin/offs/offForm/AddOffForm";
export default function CmsOffsPage() {


    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-2   py-5 
        shadow-2xl shadow-black rounded-2xl px-2 ">
            <b className="text-2xl font-bold w-full border-b pb-2">تخفیف همگانی </b>

            <AddOffForm />
            <div className="formBody  bg-white/10  rounded-2xl w-full">
                <DeleteOffForm />
            </div>
        </div>

    );
}
