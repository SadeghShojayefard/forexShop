'use client';
import Toast from '@/components/share/toast/Toast';
import { productUpdateAction } from '@/helper/productAction';
import { useCustomForm } from '@/hooks/useCustomForm';
import { checkShortName, setDiscount, setFinalPriceTether, setFinalPriceToman, setInitPriceTether, setInitPriceToman, setShortName } from '@/redux/productSlice';
import { AppDispatch, RootState } from '@/redux/store';
import '@/style/site/signIn/signIn.css'
import { productUpdateType } from '@/Type/productUpdateType.type';
import { productUpdateSchema } from '@/validation/productUpdateValidation';
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function UpdateProductForm({ currentProductData }: {
    currentProductData: productUpdateType
}) {


    const dispatch = useDispatch<AppDispatch>();
    const { shortName, isCheckingShortName, initPriceToman, initPriceTether, discount, finalPriceToman, finalPriceTether } = useSelector(

        (state: RootState) => state.product
    );


    const handleCheckShortNameBlur = () => {
        dispatch(checkShortName(shortName));
    };


    // محاسبه قیمت نهایی با useEffect
    useEffect(() => {
        // محاسبه قیمت نهایی با اعمال تخفیف
        const discountMultiplier = 1 - discount / 100;
        dispatch(setFinalPriceToman(initPriceToman * discountMultiplier));
        dispatch(setFinalPriceTether(initPriceTether * discountMultiplier));
    }, [initPriceToman, initPriceTether, discount]);


    useEffect(() => {
        dispatch(setInitPriceToman(currentProductData.initPriceToman));
        dispatch(setInitPriceTether(currentProductData.initPriceTether));
        dispatch(setDiscount(currentProductData.discount));
    }, [dispatch]);

    const { form, fields, formAction, isPending, toastVisible, lastResult } = useCustomForm({
        action: productUpdateAction,
        schema: productUpdateSchema(), // تابع اسکیما
        showToast: true,
    });
    const router = useRouter();

    useEffect(() => {
        if (lastResult?.status === "success") {
            const newShortName = lastResult.payload?.message;
            if (!newShortName) return;
            const timer = setTimeout(() => {
                router.replace(`/cmsProduct/updateProduct/${newShortName}`);
                // refreshFunction
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [lastResult]);

    return (
        <div className="formBody  bg-white/10  rounded-2xl w-full">
            <div className="form-style w-full">
                {toastVisible && (
                    <Toast text={"محصول مورد نظر با موفقیت برزورسانی شد."} />
                )}
                <form className="form-group " id={form.id} onSubmit={form.onSubmit} action={formAction} encType="multipart/form-data" >
                    <input id='id' type="hidden"
                        key={fields.id.key}
                        name={fields.id.name}
                        defaultValue={currentProductData.id}
                        readOnly
                    />
                    <div className='w-full flex flex-row  justify-between items-center gap-5'>
                        <div className="input-group">
                            <label htmlFor="name" className="block text-sm">نام محصول</label>
                            <input id="name" type="text" className="input-style text-center"
                                key={fields.name.key}
                                name={fields.name.name}
                                defaultValue={currentProductData.name}
                                dir='ltr' />
                            {fields.name.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.name.errors}</p>
                            }
                        </div>
                        <div className="input-group">
                            <label htmlFor="shortName" className="block text-sm">نام کوتاه</label>
                            <input id='shortName' type="text" className="input-style text-center" dir="ltr"
                                key={fields.shortName.key}
                                name={fields.shortName.name}
                                defaultValue={currentProductData.shortName}
                                onChange={(e) => dispatch(setShortName(e.target.value))}
                            />
                            {fields.shortName.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.shortName.errors}</p>
                            }
                        </div>
                    </div>
                    <div className='w-full flex flex-row  justify-between items-center gap-5'>
                        <div className="input-group">

                            <label htmlFor="mainImage" className="block text-sm">تصویر شاخص</label>
                            <input id='mainImage' type="file" className="input-style"
                                key={fields.mainImage.key}
                                name={fields.mainImage.name} />
                            {fields.mainImage.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.mainImage.errors}</p>
                            }
                            <p className='mt-5'>تصویر شاخص فعلی:</p>
                            <Image
                                src={currentProductData.mainImage}
                                width={75}
                                height={75}
                                alt="Trend Line.png"
                                className="rounded-md shadow shadow-black"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="slideImage " className="block text-sm">تصاویر اسلاید</label>
                            <input id='slideImage' type="file" className="input-style" multiple
                                key={fields.slideImage.key}
                                name={fields.slideImage.name} />
                            {fields.slideImage.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.slideImage.errors}</p>
                            }
                            <p className='mt-5'>تصاویر فعلی اسلاید:</p>
                            <div className='w-full flex flex-row flex-wrap justify-center items-center gap-2'>
                                {

                                    currentProductData.slideImage.map((item, index) => (
                                        <Image key={index}
                                            src={item}
                                            width={75}
                                            height={75}
                                            alt=""
                                            className="rounded-md shadow shadow-black"
                                        />
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="metaTags" className="block text-sm">کلمات کلیدی</label>
                        <input id='metaTags' type="text" className="input-style"
                            key={fields.metaTags.key}
                            name={fields.metaTags.name}
                            defaultValue={currentProductData.metaTags}
                        />
                        {fields.metaTags.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.metaTags.errors}</p>
                        }
                    </div>
                    <div className="input-group">
                        <label htmlFor="score" className="block text-sm">امتیاز</label>
                        <input id='score' type="number" className="input-style" min={0} max={5}
                            key={fields.score.key}
                            name={fields.score.name}
                            defaultValue={currentProductData.score}
                        />
                        {fields.score.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.score.errors}</p>
                        }
                    </div>
                    <div className="input-group">
                        <label htmlFor="userNumber" className="block text-sm">تعداد کاربران</label>
                        <input id='userNumber' type="number" defaultValue={0} className="input-style" min={0}
                            key={fields.userNumber.key}
                            name={fields.userNumber.name} />
                        {fields.userNumber.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.userNumber.errors}</p>
                        }
                    </div>
                    <div className='w-full flex flex-row  justify-between items-center gap-5'>

                        <div className="input-group">
                            <label htmlFor="initPriceToman" className="block text-sm">قیمت به تومان</label>
                            <input id='initPriceToman' type="number" className="input-style" dir='ltr'
                                value={initPriceToman}
                                onChange={(e) => dispatch(setInitPriceToman(Number(e.target.value)))}
                                key={fields.initPriceToman.key}
                                name={fields.initPriceToman.name}
                            />
                            {fields.initPriceToman.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.initPriceToman.errors}</p>
                            }
                        </div>
                        <div className="input-group">
                            <label htmlFor="initPriceTether" className="block text-sm">قیمت به تتر</label>
                            <input id='initPriceTether' type="number" className="input-style" dir='ltr'
                                value={initPriceTether}
                                onChange={(e) => dispatch(setInitPriceTether(Number(e.target.value)))}
                                key={fields.initPriceTether.key}
                                name={fields.initPriceTether.name} />
                            {fields.initPriceTether.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.initPriceTether.errors}</p>
                            }
                        </div>
                    </div >
                    <div className="input-group">
                        <label htmlFor="discount" className="block text-sm">تخفیف</label>
                        <input id='discount' type="number" className="input-style" min={0} max={100} dir='ltr'
                            onChange={(e) => dispatch(setDiscount(Number(e.target.value)))}
                            key={fields.discount.key}
                            name={fields.discount.name}
                            value={discount}
                        />

                        {fields.discount.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.discount.errors}</p>
                        }
                    </div>
                    <div className='w-full flex flex-row  justify-between items-center gap-5'>

                        <div className="input-group">
                            <label htmlFor="finalPriceToman" className="block text-sm">قیمت نهایی به تومان</label>
                            <input id='finalPriceToman' type="number" className="input-style" readOnly dir='ltr'
                                value={Math.round(finalPriceToman)}
                                key={fields.finalPriceToman.key}
                                name={fields.finalPriceToman.name} />
                            {fields.finalPriceToman.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.finalPriceToman.errors}</p>
                            }
                        </div>
                        <div className="input-group">
                            <label htmlFor="finalPriceTether" className="block text-sm">قیمت نهایی به تتر</label>
                            <input id='finalPriceTether' type="number" className="input-style" readOnly dir='ltr'
                                value={Math.round(finalPriceTether)}
                                key={fields.finalPriceTether.key}
                                name={fields.finalPriceTether.name} />
                            {fields.finalPriceTether.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.finalPriceTether.errors}</p>
                            }
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="indicatorFile" className="block text-sm">فایل اندیکاتور</label>
                        <input id='indicatorFile' type="file" className="input-style"
                            key={fields.indicatorFile.key}
                            name={fields.indicatorFile.name} />
                        {fields.indicatorFile.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.indicatorFile.errors}</p>
                        }
                        <p className='mt-5 font-bold' >
                            فایل فعلی:
                        </p>
                        <p className='mt-5 font-bold' dir='ltr'>
                            {
                                currentProductData.indicatorFile.replace("/IndicatorFile/", "").replace(/\/$/, "")
                            }
                        </p>
                    </div>
                    <div className='w-full flex flex-row  justify-between items-center gap-5'>

                        <div className="input-group">
                            <label htmlFor="textFA" className="block text-sm">توضیحات به فارسی</label>
                            <textarea id='textFA' className="input-style h-56"
                                key={fields.textFA.key}
                                name={fields.textFA.name}
                                defaultValue={currentProductData.textFA}
                            >

                            </textarea>
                            {fields.textFA.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.textFA.errors}</p>
                            }

                        </div>

                        <div className="input-group">
                            <label htmlFor="textEn" className="block text-sm">توضیحات به انگلیسی</label>
                            <textarea id='textEn' className="input-style h-56"
                                key={fields.textEn.key}
                                name={fields.textEn.name}
                                defaultValue={currentProductData.textEn}
                                dir='ltr'
                            >

                            </textarea>
                            {fields.textEn.errors &&
                                <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.textEn.errors}</p>
                            }

                        </div>
                    </div>


                    <div className='flex flex-col w-1/6 mb-6'>
                        <label htmlFor="publishState"  >وضعیت انتشار</label>
                        <select id="publishState" className="input-style"
                            key={fields.publishState.key}
                            name={fields.publishState.name}
                            defaultValue={currentProductData.publishState === true ? "1" : "0"}
                        >
                            <option value="0" className='formButton'>پیش نویس</option>
                            <option value="1" className='formButton'>انتشار</option>

                        </select>
                        {fields.publishState.errors &&
                            <p className=' text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.publishState.errors}</p>
                        }
                    </div>




                    <div className="w-full flex flex-row justify-center items-center gap-2">

                        <button className="w-1/2 formButton  " disabled={isPending}>
                            {isPending ? "در حال ارسال" : "بروزرسانی محصول"}

                        </button>
                    </div>


                </form>
            </div>
        </div>
    )
}

/// id
/// product name
/// short name
/// main image
/// slide images
/// Score
/// users number
/// init price toman
/// init price tether
/// discount
/// final price toman
/// final price tether
/// download link
/// definintion FA
/// definintion En
/// publishState