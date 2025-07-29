"use client"
import Toast from '@/components/share/toast/Toast';
import { offFormAction } from '@/helper/offFormAction';
import { useCustomForm } from '@/hooks/useCustomForm';
import '@/style/site/signIn/signIn.css'
import { offFormShema } from '@/validation/offFormValidation';

export default function AddOffForm() {
    const { form, fields, formAction, isPending, toastVisible } = useCustomForm({
        action: offFormAction,
        schema: offFormShema(), // تابع اسکیما
        showToast: true,
    });
    return (
        <>
            {toastVisible && (
                <Toast text={"تخفیف همگانی با موفقیت اعمال شد"} />
            )}

            <div className="formBody  bg-white/10  rounded-2xl w-full">
                <div className="form-style">
                    <form className="form-group" id={form.id} onSubmit={form.onSubmit} action={formAction}>

                        <div className="input-group">
                            <label htmlFor="offs" className="block text-sm">میزان تخفیف به درصد:  </label>
                            <input id='offs' type="number" className="input-style" min={0} max={100} defaultValue={0}
                                key={fields.offs.key}
                                name={fields.offs.name} />
                            {fields.offs.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.offs.errors}</p>
                            }
                        </div>

                        <div className="w-full flex flex-row justify-center items-center ">
                            <button className="w-1/2 formButton  "
                                disabled={isPending}
                            >
                                {isPending ? 'در حال ارسال...' : "ثبت تخفیف همگانی"}


                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </>
    )
}
