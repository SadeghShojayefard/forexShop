"use client"
import Toast from '@/components/share/toast/Toast';
import { offFormAction } from '@/helper/offFormAction';
import { useCustomForm } from '@/hooks/useCustomForm';
import '@/style/site/signIn/signIn.css'
import { offFormShema } from '@/validation/offFormValidation';

export default function DeleteOffForm() {
    const { form, fields, formAction, isPending, toastVisible } = useCustomForm({
        action: offFormAction,
        schema: offFormShema(),
        showToast: true,
        id: 'delete-form'
    });
    return (
        <>
            {toastVisible && (
                <Toast text={"تخفیف همگانی با موفقیت حذف شد"} />
            )}
            <div className="formBody  bg-white/10  rounded-2xl w-full">
                <div className="form-style">
                    <form className="form-group" id={form.id} onSubmit={form.onSubmit} action={formAction}>

                        <input id='offs' type="hidden"
                            key={fields.offs.key}
                            name={fields.offs.name}
                            defaultValue={0}
                            readOnly
                        />
                        <button className=" formButton  "
                            disabled={isPending}
                        >
                            {isPending ? 'در حال ارسال...' : "حذف تخفیف همگانی"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

