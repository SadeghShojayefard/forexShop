
import Image from 'next/image'
import '@/style/share/siteHeader.css'
import Link from "next/link";
import { SiGmail } from "react-icons/si";
import { FaTelegram } from "react-icons/fa";
import { getTranslations } from '@/i18n/getTranslations';

export default async function Footer({ locale }: { locale: string }) {
    const t = await getTranslations(locale);

    return (
        <footer className=" w-full  bg-white/30 backdrop-blur-md  gap-5
         flex-col flex-wrap justify-between items-center px-4    z-50
        p-2 m-0 ">
            <div className="grid grid-cols-3 w-full justify-between items-center border-b-2 border-black p-2">
                <div className="col-span-1 flex flex-row justify-center items-center">
                    <Link href={`/${locale}`} className="flex flex-row items-center justify-center gap-2">
                        <Image
                            src="/logo.png"
                            width={96}
                            height={48}
                            alt="site-logo"
                        />
                        <span className="font-bold text-2xl">Forex Shop</span>
                    </Link>

                </div>
                <div className="col-span-1 flex flex-col justify-center items-center">
                    <b>{t("footerQuickAccess")}</b>
                    <ul className="text-start">
                        <li>
                            <Link href={`/${locale}/stor`}>{t("store")}</Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/contactUs`}>{t("contactUs")}</Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/aboutUs`}>{t("aboutUs")}</Link>

                        </li>
                    </ul>

                </div>
                <div className="col-span-1 flex flex-col justify-center items-center">
                    <b>{t("selectedproducts")}</b>
                    <ul className={`${locale === "fa" ? "text-end" : "text-start"}`}>

                        <li>
                            <Link href={"#"}>Ichimuko Pro</Link>
                        </li>
                        <li>
                            <Link href={"#"}>trend Line Alert</Link>
                        </li>
                        <li>
                            <Link href={"#"}>Kumo Area Pro</Link>

                        </li>
                    </ul>

                </div>
            </div>
            <div className="w-full flex flex-row items-center justify-center gap-2  border-b-2 border-black p-2">
                <b>{t("Communication methods")}:</b>
                <a href="mailto:iwantapp2023@gmail.com" className='bg-white/30 backdrop-blur-md border-2 border-blue-300 rounded-full p-1
                hover:bg-blue-400'>
                    <SiGmail size="30" color='red' />
                </a>
                <a href="https://t.me/ForexIndicatorPro" className='bg-white/30  backdrop-blur-md text-blue-400 border-2 border-blue-300 rounded-full 
                hover:bg-blue-400 hover:text-blue-500'>
                    <FaTelegram size="38" />
                </a>
            </div>
            <div className="w-full flex flex-row items-center justify-center gap-2 p-2">
                <b>{t("copyRightText")}</b>
            </div>
        </footer>
    )
}


