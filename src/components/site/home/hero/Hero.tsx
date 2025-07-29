import React from 'react'
import TypeWriterEffect from '@/components/share/TypeWriterEffect/TypeWriterEffect';
import '@/style/home/Hero.css'
import Candle from '../candle/Candle';
import Image from 'next/image'
import Link from 'next/link';
import { getTranslations } from "@/i18n/getTranslations";

async function Hero({ locale }: { locale: string }) {
    const t = await getTranslations(locale);

    const typeWriterTranslations = {
        typeWriterTerm1: t("typeWriterTerm1"),
        typeWriterTerm2: t("typeWriterTerm2"),
        typeWriterTerm3: t("typeWriterTerm3"),
        typeWriterTerm4: t("typeWriterTerm4"),
        typeWriterTerm5: t("typeWriterTerm5"),
    };


    return (
        <>


            {/* <img src='/images/hero-section.jpg' className='w-screen h-screen z-[-1] absolute top-0' /> */}
            <div className="container mx-auto bg-cover flex flex-col justify-between items-center  shadow-2xl  "
                style={{ height: "calc(100vh - 68px)" }} >
                <div className="flex flex-row  justify-between items-center ">
                    <div>
                        <Image
                            src="/Mobile-metaTrader.png"
                            width={320}
                            height={500}
                            alt="Mobile-metaTrader"
                        />
                    </div>
                    <div className="w-full  p-2">
                        <div className="flex flex-col justify-center items-center text-black text-center">
                            <h2 className='  my-5  font-extrabold text-[2rem]'>
                                <TypeWriterEffect translate={typeWriterTranslations} />
                            </h2>

                            {locale === "fa" ?
                                <p> تحلیل هوشمند، تصمیم‌گیری مطمئن؛ با ابزارهایی که سود می‌سازند.</p>
                                :
                                <p> Smart analysis, confident decision-making; with tools that generate profit.</p>
                            }


                        </div>
                    </div>

                </div>

                <div className="flex flex-col-reverse justify-end items-center w-full">

                    <div className='flex flex-row justify-center items-center w-full gap-5 relative'>

                        {/* تصویر سمت چپ */}
                        <div className='sm:hidden md:block absolute left-[15%] bottom-[5vh] z-0 animate-riseOpacity'>
                            <Image
                                src="/profit.png"
                                width={200}
                                height={200}
                                alt="profit"
                            />
                        </div>

                        {/* نیم‌دایره */}
                        <div className="w-3/6 rounded-t-full bg-blue-200/30 shadow-black shadow-2xl border-white/30 backdrop-blur-3xl z-10 animate-showUp 
                            overflow-hidden flex items-center justify-center" // اینجا flex اضافه کردم
                            style={{ height: "30vh" }}
                        >
                            <Link
                                href={"#fearhers-Section"}
                                className="w-full h-full flex items-center justify-center 
                                  bg-transparent text-4xl text-blue-950/80 font-bold tracking-wide cursor-pointer
                                 hover:text-blue-500 hover:text-6xl transition-all duration-500 ease-out hover:bg-transparent 
                                  animate-pulse drop-shadow-[0_5px_13px_rgba(0,0,0,0.4)]"
                            >
                                {locale === "fa" ?
                                    <p> بزن بریم!</p>
                                    :
                                    <p> Scroll Down</p>
                                }
                            </Link>
                        </div>

                        {/* تصویر سمت راست */}
                        <div className='sm:hidden md:block absolute right-[15%] bottom-[5vh] z-0 animate-riseOpacity'>
                            <Image
                                src="/laptop.png"
                                width={200}
                                height={200}
                                alt="laptop-metaTrader"
                            />
                        </div>

                    </div>

                    {/* کندل‌ها */}
                    <div className='flex flex-row-reverse gap-3 justify-center items-center w-1/5 h-20 rounded-t-2xl backdrop-blur-3xl shadow-black shadow-2xl z-0 -mb-3 animate-SlidUp'>
                        <Candle bodyHeight={54} shadowUp={0} shadowDown={0} color="bg-lime-400" />
                        <Candle bodyHeight={50} shadowUp={2} shadowDown={2} color="bg-red-400" />
                        <Candle bodyHeight={3} shadowUp={25} shadowDown={25} color="bg-red-400" />
                        <Candle bodyHeight={30} shadowUp={25} shadowDown={0} color="bg-lime-400" />
                        <Candle bodyHeight={20} shadowUp={0} shadowDown={25} color="bg-lime-400" />
                        <Candle bodyHeight={20} shadowUp={0} shadowDown={25} color="bg-red-400" />
                    </div>

                </div>



            </div>
            {/* انیجا به بعد را یه کامپوننت جدا کنم. */}
            <div className='grid grid-cols-2 justify-around items-center w-full h-screen gap-2 mt-20' dir='rtl'>
                <div className='flex justify-center items-center w-full h-full'>
                    <div className='relative w-[80%] h-[70%]'>
                        <Image
                            src="/vector-4.png"
                            alt="laptop-metaTrader"
                            className="object-contain"
                            fill
                        />
                    </div>
                </div>
                <div className='flex justify-center items-center w-full h-full'>
                    <div className='relative w-[80%] h-[70%]'>
                        <Image
                            src="/vector-3.png"
                            alt="laptop-metaTrader"
                            className="object-contain"
                            fill
                        />
                    </div>
                </div>
            </div>




        </>
    )
}

export default Hero;

