"use client"
import Toast from '@/components/share/toast/Toast';
import { userRoleAction } from '@/helper/userRoleAction';
import { useCustomForm } from '@/hooks/useCustomForm';
import '@/style/site/signIn/signIn.css'
import { userRoleSchema } from '@/validation/userRoleValidation';

export default function UserRolesForm() {
    const { form, fields, formAction, isPending, toastVisible } = useCustomForm({
        action: userRoleAction,
        schema: userRoleSchema(), // تابع اسکیما
        showToast: true,
    });
    return (
        <div className="formBody  bg-white/10  rounded-2xl w-full">
            <div className="form-style">
                <h2 className="form-title">ثبت سطح جدید  </h2>
                {toastVisible && (
                    <Toast text={"نقش جدید با موفقیت ثبت شد"} />
                )}
                <form className="form-group" id={form.id} onSubmit={form.onSubmit} action={formAction}>
                    <div className="input-group">
                        <label htmlFor="titleFA" className="block text-sm">عنوان فارسی</label>
                        <input id='titleFA' type="text" className="input-style"
                            key={fields.titleFA.key}
                            name={fields.titleFA.name} />
                        {fields.titleFA.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.titleFA.errors}</p>
                        }
                    </div>
                    <div className="input-group">
                        <label htmlFor="titleEN" className="block text-sm">عنوان انگلیسی </label>
                        <input id='titleEN' type="text" className="input-style" dir='ltr'
                            key={fields.titleEN.key}
                            name={fields.titleEN.name} />
                        {fields.titleEN.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.titleEN.errors}</p>
                        }
                    </div>

                    <div className="w-full flex flex-row justify-center items-center ">
                        <button className="w-1/2 formButton   "
                            disabled={isPending}>
                            {isPending ? "در حال ارسال..." : "ثبت"}
                        </button>
                    </div>


                </form>
            </div>
        </div>
    )
}

