import { Button } from '@/components/ui/button'
import React from 'react'
import { FaChalkboardTeacher } from "react-icons/fa";

export default function DefinitionSection({ title, bit64, text, locale }: { title: string, bit64: string, text: string, locale: string }) {




    return (
        <div className="flex flex-row justify-center items-center w-full text-dark p-5 rounded-lg shadow-2xl shadow-black rounded-r-2xl my-2   ">
            <div className='flex flex-col w-full items-center'>
                {/* توضیحات*/}
                <h2 className="text-lg font-bold flex flex-row gap-5 mb-5 w-full items-start">
                    <span>{title}</span>
                </h2>
                <pre className={`w-full text-justify px-8 text-wrap  font-vazir `}>
                    {text}
                </pre>


                <p className=' font-bold px-8 w-full  text-red-500 mt-2'>✅ {bit64}</p>
                {
                    locale === "fa" ?
                        (
                            <p className=' font-bold px-8 w-full  text-red-500 mt-2'>✅ لطفا برای خرید به جیمیل یا اکانت تلگرام پیام دهید</p>
                        )
                        :
                        (
                            <p className=' font-bold px-8 w-full  text-red-500 mt-2'>✅ To purchase, send a message to Gmail or Telegram account.</p>
                        )
                }
            </div>

        </div>
    )
}
