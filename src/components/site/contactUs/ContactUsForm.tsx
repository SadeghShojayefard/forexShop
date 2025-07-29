"use client"
import '@/style/site/signIn/signIn.css';
import { contactUsValType } from '@/Type/validation/contactUsValType.type';
import { ContactUsFormType } from '@/Type/translationType/ContactUsFormType.type';
import { contactUsFormAction } from '@/helper/contactUsFormAction';
import { ContactFormSchema } from '@/validation/ContactUsValidation';
import Toast from '@/components/share/toast/Toast';
import { useCustomForm } from '@/hooks/useCustomForm';
export default function ContactUsForm({
    translate,
    formValTranslate
}: {
    translate: ContactUsFormType;
    formValTranslate: contactUsValType
}) {


    const { form, fields, formAction, isPending, toastVisible } = useCustomForm({
        action: contactUsFormAction,
        schema: ContactFormSchema(formValTranslate), // تابع اسکیما
        showToast: true,
    });
    return (
        <div className="formBody bg-white/10 w-full">
            <div className="form-style">
                <h2 className="form-title">{translate.Translation.contactFormTitle}</h2>

                {toastVisible && (
                    <Toast text={formValTranslate.contactUsformSuccessMessage} />
                )}
                <form className="form-group" id={form.id} onSubmit={form.onSubmit} action={formAction}>
                    {/* فیلد نام */}
                    <div className="input-group">
                        <label htmlFor="name" className="block text-sm">
                            {translate.Translation.name}
                        </label>
                        <input
                            key={fields.name.key}
                            name={fields.name.name}
                            type="text"
                            id="name"
                            className={`input-style `}
                            dir={translate.locale === 'fa' ? 'rtl' : 'ltr'}
                        />
                        {fields.name.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.name.errors}</p>
                        }
                    </div>

                    {/* فیلد ایمیل */}
                    <div className="input-group">
                        <label htmlFor="email" className="block text-sm">
                            {translate.Translation.email}
                        </label>
                        <input
                            key={fields.email.key}
                            name={fields.email.name}
                            type="email"
                            id="email"
                            className={`input-style `}
                            dir="ltr"

                        />
                        {fields.email.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.email.errors}</p>
                        }
                    </div>

                    {/* فیلد تلفن */}
                    <div className="input-group">
                        <label htmlFor="phone" className="block text-sm">
                            {translate.Translation.phone}
                        </label>
                        <input
                            key={fields.phone.key}
                            name={fields.phone.name}
                            type="text"
                            id="phone"
                            className={`input-style `}
                            dir="ltr"
                        />
                        {fields.phone.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.phone.errors}</p>
                        }
                    </div>

                    {/* فیلد پیام */}
                    <div className="input-group">
                        <label htmlFor="message" className="block text-sm">
                            {translate.Translation.messeageText}
                        </label>
                        <textarea
                            key={fields.message.key}
                            name={fields.message.name}
                            id="message"
                            className={`input-style h-56 `}
                            dir={translate.locale === 'fa' ? 'rtl' : 'ltr'}
                        />
                        {fields.message.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.message.errors}</p>
                        }
                    </div>

                    <div className="w-full flex flex-row justify-center items-center">
                        <button
                            type="submit"
                            className="w-1/2 bg-sky-500 backdrop-blur-2xl text-white p-2 mt-4 rounded-2xl cursor-pointer shadow-xl shadow-sky-800 hover:bg-sky-600"
                            disabled={isPending}
                        >
                            {isPending ? (translate.locale === 'fa' ? 'در حال ارسال...' : 'sending...') : translate.Translation.buttonText}

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


// defaultValue = { fields.email.initialValue }
