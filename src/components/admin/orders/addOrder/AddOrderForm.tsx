"use client"
import Toast from '@/components/share/toast/Toast';
import { orderAction } from '@/helper/orderAction';
import { checkMainNameAction } from '@/helper/productAction';
import { checkUserNameExistAction } from '@/helper/UserAction';
import { useCustomForm } from '@/hooks/useCustomForm';
import { setRefreshData } from '@/redux/orderSlice';
import { checkName, setShortName } from '@/redux/productSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { checkUserName, setUserName } from '@/redux/userSlice';
import '@/style/site/signIn/signIn.css'
import { AddOrderSchema } from '@/validation/AddOrderValidation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AddOrderForm() {


    const dispatch = useDispatch<AppDispatch>();
    const { userName, isCheckingUserName } = useSelector(
        (state: RootState) => state.users
    );
    const { shortName, isCheckingShortName } = useSelector(
        (state: RootState) => state.product
    );

    const handleUserNameBlur = () => {
        if (userName.trim().length >= 5) {
            dispatch(checkUserName(userName));
        }
    };

    const handleProductNameBlur = () => {
        if (shortName.trim().length >= 10) {
            dispatch(checkName(shortName));
        }
    };

    const { form, fields, formAction, isPending, toastVisible, lastResult } = useCustomForm({
        action: orderAction,
        schema: AddOrderSchema(), // تابع اسکیما
        showToast: true,
        id: "add-order-form"
    });

    useEffect(() => {
        dispatch(setRefreshData());
    }, [lastResult]);

    return (
        <>
            {toastVisible && (
                <Toast text={"فاکتور با موفقیت ثبت شد."} />
            )}

            <div className="formBody  bg-white/10  rounded-2xl w-full">
                <div className="form-style">
                    <h2 className="form-title">افزودن فاکتور</h2>
                    <form className="form-group" id={form.id} action={formAction} onSubmit={form.onSubmit}>
                        <div className="input-group">
                            <label htmlFor="username" className="block text-sm">نام کاربری</label>
                            <input id='username' type="text" className="input-style"
                                key={fields.username.key}
                                name={fields.username.name}
                                onChange={(e) => dispatch(setUserName(e.target.value))}
                                onBlur={handleUserNameBlur} />
                            {fields.username.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.username.errors}</p>
                            }
                            {isCheckingUserName && (
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>نام کاربری مورد نظر وجود ندارد</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label htmlFor="product" className="block text-sm">نام محصول</label>
                            <input id='product' type="text" className="input-style"
                                key={fields.product.key}
                                name={fields.product.name}
                                onChange={(e) => dispatch(setShortName(e.target.value))}
                                onBlur={handleProductNameBlur}
                            />
                            {fields.product.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.product.errors}</p>
                            }
                            {!isCheckingShortName && (
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>محصول مورد نظر وجود ندارد</p>
                            )}
                        </div>
                        <div className="input-group">
                            <label htmlFor="count" className="block text-sm">تعداد </label>
                            <input id='count' type="number" className="input-style" dir='ltr'
                                key={fields.count.key}
                                name={fields.count.name} />
                            {fields.count.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.count.errors}</p>
                            }
                        </div>

                        <div className="w-full flex flex-row justify-center items-center ">
                            <button className="w-1/2 formButton  "
                                disabled={isPending}>
                                {isPending ? 'در حال ارسال...' : "ثبت فاکتور"}
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </>
    )
}
// username
// product
// count
// price
// total