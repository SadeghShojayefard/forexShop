"use client"
import { changeNameAction } from "@/helper/changeAvatarAction";
import { useCustomForm } from "@/hooks/useCustomForm";
import { accountChangeNameTranslation } from "@/Type/translationType/accountChangeNameTranslation.type";
import { changeNameValType } from "@/Type/validation/changeNameValType.type";
import { changeNameSchema } from "@/validation/changeNameValidation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const ChangeName: React.FC<{
    username: string;
    locale: string;
    name: string;
    translate: accountChangeNameTranslation;
    valTranslate: changeNameValType;
}> = ({ username, locale, name, translate, valTranslate }) => {

    const { form, fields, formAction, isPending, toastVisible, lastResult } = useCustomForm({
        action: changeNameAction,
        schema: changeNameSchema(valTranslate),
        showToast: true,
        id: "change-name-form"
    });

    const { update } = useSession();
    useEffect(() => {
        if (lastResult?.status === 'success') {
            (async () => {
                try {
                    const res = await fetch('/api/session/update');
                    if (!res.ok) {
                        console.error('Failed to fetch updated session:', res.status, await res.text());
                        return;
                    }

                    const json = await res.json();
                    console.log('Session update response:', json);

                    if (json.status === 'success') {
                        // اطمینان از ساختار درست داده برای update
                        const updatedSession = {
                            id: json.user.id,
                            username: json.user.username,
                            name: json.user.name || null,
                            email: json.user.email,
                            avatar: json.user.avatar,
                            role: json.user.role,
                        };

                        const updateResult = await update(updatedSession);
                        console.log('Session update result:', updateResult);

                        setTimeout(() => {
                            window.location.reload();
                        }, 500)
                    } else {
                        console.error('Session update failed:', json);
                    }
                } catch (error) {
                    console.error('Error updating session:', error);
                }
            })();
        }
    }, [lastResult, update]);

    return (

        <div className="w-full  flex flex-row flex-wrap justify-evenly items-center gap-2  p-2  shadow-xl shadow-black rounded-xl  mt-5 ">
            <b className="font-bold text-lg text-black text-shadow-xs text-shadow-black text-start w-full"></b>

            <div className="w-full p-10 flex items-center justify-start text-black z-10 shadow-2xl shadow-black  bg-white/10 rounded-2xl ">
                <div className="form-style ">
                    <h2 className="form-title">{translate.changeName}   </h2>

                    {toastVisible && (
                        <p className=" bg-sky-500 backdrop-blur-2xl text-white px-5 py-2  rounded-lg mt-2
                             transition-all duration-300 ease-in-out transform shadow-xl shaodw-black text-center">{valTranslate.ValNameMaxSuccess}</p>
                    )}
                    <form className="form-group" id={form.id} onSubmit={form.onSubmit} action={formAction}>
                        <input id="username" type="hidden" className="input-style text-center" defaultValue={username}
                            key={fields.username.key}
                            name={fields.username.name} />

                        <div className="input-group">
                            <label htmlFor="name" className="block text-sm">{translate.newName} </label>
                            <input id="name" type="text" className="input-style text-center"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={name}
                            />
                            {fields.name.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.name.errors}</p>
                            }
                        </div>

                        <div className="w-full flex flex-row justify-center items-center ">
                            <button className="w-1/2  bg-sky-500 backdrop-blur-2xl text-white p-2 mt-4 rounded-2xl cursor-pointer
                             shadow-xl  shadow-sky-800 
                               hover:hover:bg-sky-600 hover:backdrop-blur-2xl text-wrap font-bold  "
                                type="submit"
                                disabled={isPending}
                            >

                                {isPending ? (locale === 'fa' ? 'در حال پردازش...' : 'pending...') : translate.changeName}

                            </button>
                        </div>


                    </form>
                </div>
            </div>

        </div>
    );
}
export default ChangeName;