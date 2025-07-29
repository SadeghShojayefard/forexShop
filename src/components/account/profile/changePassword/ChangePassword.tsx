"use client"
import { changePasswordAction } from "@/helper/changePasswordAction";
import { useCustomForm } from "@/hooks/useCustomForm";
import { accountChangePasswordTypeTranslation } from "@/Type/translationType/accountChangePasswordTypeTranslation.type";
import { changePasswordValType } from "@/Type/validation/changePasswordValType.type";
import { changePasswordSchema } from "@/validation/changePassword";
import { useEffect, useState } from "react";

const ChangePassword: React.FC<{
    username: string;
    translate: accountChangePasswordTypeTranslation;
    valTranslate: changePasswordValType;
    locale: string;
}> = ({ username, translate, valTranslate, locale }) => {

    const [usernameError, setUsernameError] = useState(false);
    const [oldPasswordError, setOldPasswordError] = useState(false);

    const { form, fields, formAction, isPending, toastVisible, lastResult } = useCustomForm({
        action: changePasswordAction,
        schema: changePasswordSchema(valTranslate),
        showToast: true,
        id: "change-password-form"
    });

    useEffect(() => {
        if (lastResult?.status !== 'success') {
            const message = lastResult?.payload.message;
            if (message === "userNotExist") {
                setUsernameError(true);
                setOldPasswordError(false);
            } else if (message === "oldPassword") {
                setUsernameError(false);
                setOldPasswordError(true);
            }
        }
        else if (lastResult?.status === 'success') {
            setUsernameError(false);
            setOldPasswordError(false);
        }
    }, [lastResult]);
    return (
        <>

            {/* userNotExist
                oldPassword
                    newPasswordNotMatch */}
            <div className="w-full  flex flex-row flex-wrap justify-evenly items-center gap-2  p-2  shadow-xl shadow-black rounded-xl   ">

                <b className="font-bold text-lg text-black text-shadow-xs text-shadow-black text-start w-full"></b>

                <div className="w-full p-10 flex items-center justify-start text-black z-10 shadow-2xl shadow-black  bg-white/10 rounded-2xl ">
                    <div className="form-style ">
                        <h2 className="form-title">{translate.accountChangePassword}  </h2>
                        {toastVisible && (
                            <p className=" bg-sky-500 backdrop-blur-2xl text-white px-5 py-2  rounded-lg mt-2
                             transition-all duration-300 ease-in-out transform shadow-xl shaodw-black text-center">{valTranslate.valPasswordChangeMessage}</p>
                        )}
                        {usernameError &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{valTranslate.valSignInUserNameRequir}</p>
                        }
                        {oldPasswordError &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{valTranslate.valCurrentPassword}</p>
                        }

                        <form className="form-group" id={form.id} onSubmit={form.onSubmit} action={formAction}>
                            <div className="input-group">
                                <input
                                    id="username"
                                    type="hidden"

                                    defaultValue={username}
                                    key={fields.username.key}
                                    name={fields.username.name} />
                                {fields.username.errors &&
                                    <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.username.errors}</p>
                                }
                            </div>
                            <div className="input-group">
                                <label htmlFor="currentPassword" className="block text-sm">{translate.accountCurrentPassword} </label>
                                <input id="currentPassword" type="password" className="input-style text-left" dir="ltr"
                                    key={fields.currentPassword.key}
                                    name={fields.currentPassword.name} />
                                {fields.currentPassword.errors &&
                                    <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.currentPassword.errors}</p>
                                }
                            </div>
                            <div className="input-group">
                                <label htmlFor="newPassword" className="block text-sm"> {translate.accountNewPassword}</label>
                                <input id="newPassword" type="password" className="input-style text-left" dir="ltr"
                                    key={fields.newPassword.key}
                                    name={fields.newPassword.name} />
                                {fields.newPassword.errors &&
                                    <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.newPassword.errors}</p>
                                }
                            </div>

                            <div className="input-group">
                                <label htmlFor="newPassword2" className="block text-sm"> {translate.accountRepeatNewPassword}</label>
                                <input id="newPassword2" type="password" className="input-style text-left" dir="ltr"
                                    key={fields.newPassword2.key}
                                    name={fields.newPassword2.name} />
                                {fields.newPassword2.errors &&
                                    <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.newPassword2.errors}</p>
                                }
                            </div>
                            <div className="w-full flex flex-row justify-center items-center ">
                                <button className="w-1/2  bg-sky-500 backdrop-blur-2xl text-white p-2 mt-4 rounded-2xl cursor-pointer
                             shadow-xl  shadow-sky-800 
                               hover:hover:bg-sky-600 hover:backdrop-blur-2xl text-wrap font-bold  "
                                    disabled={isPending}
                                >
                                    {isPending ? (locale === 'fa' ? 'در حال پردازش...' : 'pending...') : translate.accountChangePassword}


                                </button>
                            </div>


                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}
export default ChangePassword;