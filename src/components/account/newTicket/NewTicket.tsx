"use client"
import Toast from '@/components/share/toast/Toast';
import { newTicketAction } from '@/helper/newTicketAction';
import { useCustomForm } from '@/hooks/useCustomForm';
import '@/style/site/signIn/signIn.css'
import { newTicektFormTranslation } from '@/Type/translationType/newTicektFormTranslation.type'
import { newTicketValType } from '@/Type/validation/newTicketValType.type'
import { newTicketSchema } from '@/validation/newTicketValidation';
export default function NewTicket(
    { translate, username, valTranslate, locale }:
        { translate: newTicektFormTranslation, username: string, valTranslate: newTicketValType, locale: string }) {

    const { form, fields, formAction, isPending, toastVisible } = useCustomForm({
        action: newTicketAction,
        schema: newTicketSchema(valTranslate),
        showToast: true,
    });
    return (
        <div className="  bg-white/10 w-full shadow-2xl shadow-black rounded-2xl  p-5">
            {toastVisible && (
                <Toast text={valTranslate.ticketSuccefull} />
            )}
            <div className="form-style">
                <form className="form-group" id={form.id} action={formAction} onSubmit={form.onSubmit}>
                    <div className="input-group">
                        <input
                            key={fields.username.key}
                            name={fields.username.name}
                            id='username'
                            defaultValue={username}
                            type="hidden"
                            className="input-style" />
                        <label htmlFor="title" className="block text-sm">{translate.formTicketTitle}</label>
                        <input
                            key={fields.title.key}
                            name={fields.title.name}
                            id='title'
                            type="text"
                            className="input-style" />
                        {fields.title.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.title.errors}</p>
                        }
                    </div>

                    <div className="input-group">
                        <label htmlFor="text" className="block text-sm">{translate.formTicketText}</label>
                        <textarea
                            key={fields.text.key}
                            name={fields.text.name}
                            id='text'
                            className="input-style h-56" >
                        </textarea>
                        {fields.text.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.text.errors}</p>
                        }
                    </div>
                    <div className="w-full flex flex-row justify-center items-center ">
                        <button className="w-1/2  bg-sky-500 backdrop-blur-2xl text-white p-2 mt-4 rounded-2xl cursor-pointer
                             shadow-xl  shadow-sky-800 
                               hover:hover:bg-sky-600 hover:backdrop-blur-2xl text-wrap font-bold  "
                            disabled={isPending}
                        >
                            {isPending ? (locale === 'fa' ? 'در حال ارسال...' : 'sending...') : translate.formTicketSend}


                        </button>
                    </div>


                </form>
            </div>
        </div>
    )
}

