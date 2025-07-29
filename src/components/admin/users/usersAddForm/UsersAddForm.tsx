"use client"
import Toast from '@/components/share/toast/Toast';
import { AddUserAction, checkEmailExistAction, checkUserNameExistAction } from '@/helper/UserAction';
import { useCustomForm } from '@/hooks/useCustomForm';
import { AppDispatch, RootState } from '@/redux/store';
import { checkEmail, checkUserName, setEmail, setRefreshData, setUserName } from '@/redux/userSlice';
import '@/style/site/signIn/signIn.css'
import { addUserShema } from '@/validation/addUserValidation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UsersAddForm() {

    const dispatch = useDispatch<AppDispatch>();
    const { userName, email, isCheckingUserName, isCheckingEmail, refreshData } = useSelector(
        (state: RootState) => state.users
    );

    const handleUserNameBlur = () => {
        if (userName.trim().length >= 5) {
            dispatch(checkUserName(userName));
        }
    };

    const handleEmailBlur = () => {
        dispatch(checkEmail(email));
    };

    const { form, fields, formAction, isPending, toastVisible, lastResult } = useCustomForm({
        action: AddUserAction,
        schema: addUserShema(),
        showToast: true,
        id: 'add-user-form',
    });

    useEffect(() => {
        dispatch(setRefreshData());
    }, [lastResult]);

    return (
        <div className="formBody  bg-white/10  rounded-2xl w-full">
            <div className="form-style">
                <h2 className="form-title">افزودن کاربر جدید </h2>
                {toastVisible && (

                    <Toast text="کاربر مورد نظر با موفقیت ثبت شد" />
                )}
                <form className="form-group" id={form.id} action={formAction} onSubmit={form.onSubmit}>
                    <div className="input-group">
                        <label htmlFor="username" className="block text-sm">نام کاربری</label>
                        <input id='username' type="text" className="input-style"
                            dir='ltr'
                            key={fields.username.key}
                            name={fields.username.name}
                            onChange={(e) => dispatch(setUserName(e.target.value))}

                            onBlur={handleUserNameBlur}
                        />
                        {fields.username.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.username.errors}</p>
                        }
                        {!isCheckingUserName && (
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>نام کاربری ثبت شده تکراری است.</p>
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className="block text-sm">ایمیل</label>
                        <input id='email' type="email" className="input-style"
                            dir='ltr'
                            key={fields.email.key}
                            name={fields.email.name}
                            onChange={(e) => dispatch(setEmail(e.target.value))}
                            onBlur={handleEmailBlur} />
                        {fields.email.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.email.errors}</p>
                        }
                        {!isCheckingEmail && (
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>ایمیل ثبت شده تکراری است.</p>
                        )}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="block text-sm">رمز عبور</label>
                        <input id='password' type="password" className="input-style"
                            dir='ltr'
                            key={fields.password.key}
                            name={fields.password.name} />
                        {fields.password.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.password.errors}</p>
                        }
                    </div>

                    <div className="w-full flex flex-row justify-center items-center ">
                        <button className="w-1/2 formButton  "
                            disabled={isPending}>
                            {isPending ? "در حال ارسال" : "ثبت"}
                        </button>
                    </div>


                </form>
            </div>
        </div>
    )
}

// username
// email
// password
// name
// avatar
// register date
// lock count
// is lock?
// date to finish lock
// date to reset wrong input