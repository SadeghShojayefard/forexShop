"use client"
import { signUpformAction } from "@/helper/signUpformAction";
import { useCustomForm } from "@/hooks/useCustomForm";
import { signUpTranslationType } from "@/Type/translationType/signUpTranslationType.type"
import { signUpValType } from "@/Type/validation/signUpValType.type";
import { signUpSchema } from "@/validation/signUpValidation";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function SignUpForm(
    { translate, valTranslate }:
        { translate: signUpTranslationType; valTranslate: signUpValType }) {
    const { form, fields, formAction, isPending, lastResult } = useCustomForm({
        action: signUpformAction,
        schema: signUpSchema(valTranslate), // تابع اسکیما
        showToast: false,
        id: "signUp-form"
    });

    useEffect(() => {
        if (lastResult?.status === 'success') {
            const { username, password } = lastResult.payload;
            (async () => {
                await signIn("credentials", {
                    username,
                    password,
                    redirect: true,
                    callbackUrl: `/${translate.locale}/account/profile/${username}`,
                });
            })();
        }
    }, [lastResult]);



    return (
        <div className="formBody  bg-white/10 w-1/2">
            <div className="form-style">
                <h2 className="form-title">{translate.Translation.signUpTitle}</h2>
                <form className="form-group" id={form.id} onSubmit={form.onSubmit} action={formAction}>
                    <input
                        key={fields.locale.key}
                        name={fields.locale.name}
                        id="locale"
                        type="hidden"
                        defaultValue={translate.locale} />
                    <div className="input-group">
                        <label htmlFor="username" className="block text-sm">{translate.Translation.userName}</label>
                        <input
                            key={fields.username.key}
                            name={fields.username.name}
                            id="username"
                            type="text"
                            className="input-style"
                            dir="ltr" />
                        {fields.username.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.username.errors}</p>
                        }
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className="block text-sm">{translate.Translation.email} </label>
                        <input
                            key={fields.email.key}
                            name={fields.email.name}
                            id="email"
                            type="email"
                            className="input-style"
                            dir="ltr" />
                        {fields.email.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.email.errors}</p>
                        }
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="block text-sm">{translate.Translation.password}</label>
                        <input
                            key={fields.password.key}
                            name={fields.password.name}
                            id="password"
                            type="password"
                            className="input-style"
                            dir="ltr"
                        />
                        {fields.password.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.password.errors}</p>
                        }
                    </div>
                    <div className="input-group">
                        <label htmlFor="password2" className="block text-sm">{translate.Translation.repeatPassword}</label>
                        <input
                            key={fields.password2.key}
                            name={fields.password2.name}
                            id="password2"
                            type="password"
                            className="input-style"
                            dir="ltr"
                        />
                        {fields.password2.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>
                                {fields.password2.errors}</p>
                        }
                    </div>
                    <div className=" w-full flex flex-col ">
                        {
                            lastResult && lastResult.status === 'error' && lastResult.payload?.message === 'username' ? (
                                <p className="text-md bg-red-300/50 backdrop-blur-2xl mt-5 p-1 inline-block rounded-2xl">
                                    {valTranslate.usernameExistError}
                                </p>
                            ) : lastResult && lastResult.status === 'error' && lastResult.payload?.message === 'email' ? (
                                <p className="text-md bg-red-300/50 backdrop-blur-2xl mt-5 p-1 inline-block rounded-2xl">
                                    {valTranslate.EmailExistError}
                                </p>
                            ) : null
                        }
                        <button className="w-1/2  bg-sky-500 backdrop-blur-2xl text-white p-2 mt-4 rounded-2xl cursor-pointer
                    shadow-xl  shadow-sky-800 
                       hover:hover:bg-sky-600 hover:backdrop-blur-2xl text-wrap font-bold  "
                            disabled={isPending}
                        >
                            {isPending ? (translate.locale === 'fa' ? 'در حال ثبت نام...' : 'Register in sec...') : translate.Translation.signUpTitle}

                        </button>
                    </div>


                </form>
            </div>
        </div>
    )
}

