
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { forgetPasswordTranslationType } from "@/Type/translationType/forgetPasswordTranslationType.type";
import { forgetPasswordValType } from "@/Type/validation/forgetPasswordValType.type";
import { useCustomForm } from "@/hooks/useCustomForm";
import { forgetPasswordAction } from "@/helper/forgetPasswordAction";
import { forgetPasswordShema } from "@/validation/forgetPasswordValidation";
import Toast from "@/components/share/toast/Toast";

export default function ForgetPassword(
    { translate, validationTranslation }:
        {
            translate: forgetPasswordTranslationType;
            validationTranslation: forgetPasswordValType;
        }) {
    const { form, fields, formAction, isPending, toastVisible } = useCustomForm({
        action: forgetPasswordAction,
        schema: forgetPasswordShema(validationTranslation), // تابع اسکیما
        showToast: true,
        id: "forgetPassword-form"
    });
    return (
        <>
            {toastVisible && (
                <Toast text={validationTranslation.valForgetPassSuccesMessage} />
            )}
            <Dialog  >
                <DialogTrigger asChild>
                    <button className="w-full sm:col-span-2 md:col-span-1  bg-cyan-500 backdrop-blur-2xl text-white p-2 mt-4 rounded-2xl cursor-pointer
                              shadow-xl  shadow-cyan-800 
                              hover:bg-cyan-600 hover:backdrop-blur-2xl text-wrap font-bold">
                        {translate.Translation.forgetPasswordButton}
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] max-h-[95vh] overflow-auto bg-white/10 backdrop-blur-2xl">
                    <DialogHeader className="text-center" >
                        <DialogTitle className="w-full text-center" >
                            {translate.Translation.passwordRecovery}
                        </DialogTitle>
                        <DialogDescription className={`w-full ${translate.locale === "fa" ? "text-right" : "text-left"}`} dir={`${translate.locale === "fa" ? "rtl" : "ltr"}`}>
                            {translate.Translation.forgetPasswordText}
                        </DialogDescription>
                    </DialogHeader>
                    <form className='flex flex-col w-full mt-5 ' id={form.id} action={formAction} onSubmit={form.onSubmit}  >
                        <div className="input-group">
                            <label htmlFor="username" className="block text-sm">
                                {translate.Translation.userName}
                            </label>
                            <input
                                key={fields.username.key}
                                name={fields.username.name}
                                id="username"
                                type="text"
                                className="input-style"
                                dir="ltr"
                            />
                            {fields.username.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.username.errors}</p>
                            }
                        </div>
                        <div className="input-group">
                            <label htmlFor="email" className="block text-sm">
                                {translate.Translation.email}
                            </label>
                            <input
                                key={fields.email.key}
                                name={fields.email.name}
                                id="email"
                                type="email"
                                className="input-style"
                                dir="ltr"
                            />
                            {fields.email.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.email.errors}</p>
                            }
                        </div>
                        <DialogFooter className="mt-10">
                            <Button type="submit" className="bg-lime-500 hover:bg-lime-700 cursor-pointer " disabled={isPending}
                            >
                                {isPending ? (translate.locale === 'fa' ? 'در حال ارسال...' : 'pending...') : translate.Translation.send}
                            </Button>
                            <DialogClose asChild>
                                <Button type="button" className="bg-red-200 hover:bg-red-400 cursor-pointer" >
                                    {translate.Translation.close}
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
