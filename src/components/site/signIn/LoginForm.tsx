"use client"
import ForgetPassword from "./ForgetPassword";
import { SignInTranslationType } from "@/Type/translationType/SignInTranslationType.type";
import { forgetPasswordTranslationType } from "@/Type/translationType/forgetPasswordTranslationType.type";
import { signInValType } from "@/Type/validation/signInValType.type";
import { SignInFormAction } from "@/helper/signInFormAction";
import { forgetPasswordValType } from "@/Type/validation/forgetPasswordValType.type";
import { SignInSchema } from "@/validation/signInValidation";
import { useCustomForm } from "@/hooks/useCustomForm";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // مطمئن شو که بالا اینو ایمپورت کردی



export default function LoginForm(

    { translate, forgetTranslation, signInValTranslations, ForgetValTranslations }:
        {
            translate: SignInTranslationType;
            forgetTranslation: forgetPasswordTranslationType;
            signInValTranslations: signInValType;
            ForgetValTranslations: forgetPasswordValType
        }) {

    const [signInError, setSignInError] = useState(false);
    const router = useRouter();
    const { form, fields, formAction, isPending, lastResult } = useCustomForm({
        action: SignInFormAction,
        schema: SignInSchema(signInValTranslations), // تابع اسکیما
        showToast: false,
        id: "signIn-form"
    });

    useEffect(() => {
        if (lastResult?.status === 'success') {
            const { username, password } = lastResult.payload;

            (async () => {
                try {
                    const res = await signIn("credentials", {
                        username,
                        password,
                        redirect: false,
                        callbackUrl: `/${translate.locale}/account/profile/${username}`,

                    });

                    if (res?.ok) {
                        setSignInError(false);
                        router.push(res.url || `/${translate.locale}/account/profile/${username}`); // اینجا

                    } else {
                        setSignInError(true);
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    setSignInError(true);
                }
            })();
        }
    }, [lastResult]);

    return (
        <div className="formBody bg-white/30 w-1/2 ">
            <div className="form-style">
                <h2 className="form-title">{translate.Translation.signInTitle}</h2>
                <form className="form-group" id={form.id} onSubmit={form.onSubmit} action={formAction}>
                    <input
                        key={fields.locale.key}
                        name={fields.locale.name}
                        defaultValue={translate.locale}
                        id="locale"
                        type="hidden"
                    />
                    <div className="input-group">
                        <label htmlFor="userName" className="block text-sm">{translate.Translation.userName}</label>
                        <input
                            key={fields.userName.key}
                            name={fields.userName.name}
                            id="userName"
                            type="text"
                            className="input-style"
                            dir="ltr" />
                        {fields.userName.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.userName.errors}</p>
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
                            dir="ltr" />
                        {fields.password.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.password.errors}</p>
                        }

                    </div>
                    {
                        signInError === true &&
                        <p className="text-md bg-red-300/50 backdrop-blur-2xl mt-5 p-1 inline-block rounded-2xl">
                            {signInValTranslations.signInError}
                        </p>
                    }
                    <div className="grid  grid-cols-2  flex-wrap justify-center items-center gap-2 w-full ">

                        <div className="sm:col-span-2 md:col-span-1 w-full">

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-teal-600 backdrop-blur-2xl text-white p-2 mt-4 rounded-2xl cursor-pointer shadow-xl shadow-teal-800 hover:bg-teal-800"
                            >
                                {isPending ? (translate.locale === 'fa' ? 'در حال ورود...' : 'login in sec...') : translate.Translation.login}
                            </button>
                        </div>
                        <div className="sm:col-span-2 md:col-span-1 w-full">


                            <ForgetPassword translate={forgetTranslation} validationTranslation={ForgetValTranslations} />
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

// defaultValue = { fields.email.initialValue }
