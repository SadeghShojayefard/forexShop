
"use client"
import { answerTicketAction } from "@/helper/answerTicketAction";
import { useCustomForm } from "@/hooks/useCustomForm";
import { asnwerTicketTranslationType } from "@/Type/translationType/asnwerTicketTranslationType.type";
import { newTicketValType } from "@/Type/validation/newTicketValType.type";
import { answerTicketSchema } from "@/validation/answerTicketValidation";
export default function AnswerTicketAC({ translate, valTranslate, locale }
    :
    { translate: asnwerTicketTranslationType, valTranslate: newTicketValType, locale: string }) {

    const { form, fields, formAction, isPending, toastVisible } = useCustomForm({
        action: answerTicketAction,
        schema: answerTicketSchema(valTranslate), // تابع اسکیما
        showToast: true,
    });
    return (
        <div className="w-full flex flex-col gap-2 justify-center items-center  shadow-2xl shadow-black rounded-2xl p-3 mt-10">
            {toastVisible && (
                <p className="bg-cyan-500/20 p-2 rounded-2xl shadow shadow-black">{valTranslate.ticketSuccefull}</p>
            )}
            <div className="w-full my-2">
                <b className="font-bold text-xl">{translate.answerTicket} </b>
                <form className="form-group" id={form.id} onSubmit={form.onSubmit} action={formAction}>


                    <div className="input-group">
                        <label htmlFor="login-password" className="block text-sm">{translate.answerText}</label>
                        <input
                            key={fields.ticketId.key}
                            name={fields.ticketId.name}
                            type="hidden"
                            id="ticketId"
                            defaultValue={2} />
                        <textarea
                            id="text"
                            className="input-style h-56"
                            placeholder={translate.answerPlaceholder}
                            key={fields.text.key}
                            name={fields.text.name}
                        >

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

                            {isPending ? (locale === 'fa' ? 'در حال ارسال...' : 'sending...') : translate.sendAnswer}

                        </button>
                    </div>


                </form>
            </div>
        </div>

    );
}
