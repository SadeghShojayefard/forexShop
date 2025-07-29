
import { IoDiamond } from "react-icons/io5";
import CardItems from '@/components/share/cardItems/CardItems';

import { GiChessKnight } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { MdTimeline } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { GiTargetArrows } from "react-icons/gi";
import { FaSyncAlt } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa6";
import SectionsTitle from "@/components/share/SectionsTitle/SectionsTitle";
import ShopButton from "../shopButton/ShopButton";
import { getTranslations } from "@/i18n/getTranslations";


export default async function Feathers({ locale }: { locale: string }) {
    const t = await getTranslations(locale);

    const helps = [
        {
            id: 1,
            Icon: GiTargetArrows,
            title: t("ItemTitle1"),
            text: t("ItemText1"),
            iconColor: "text-blue-500",

        },
        {
            id: 2,
            Icon: GiChessKnight,
            title: t("ItemTitle2"),
            text: t("ItemText2"),
            iconColor: "text-green-500",
        },
        {
            id: 3,
            Icon: IoDiamond,
            title: t("ItemTitle3"),
            text: t("ItemText3"),
            iconColor: "text-purple-500",
        },
        {
            id: 4,
            Icon: FiSettings,
            title: t("ItemTitle4"),
            text: t("ItemText4"),
            iconColor: "text-orange-400",
        },
        {
            id: 5,
            Icon: MdTimeline,
            title: t("ItemTitle5"),
            text: t("ItemText5"),
            iconColor: "text-indigo-500",
        },
        {
            id: 6,
            Icon: MdNotificationsActive,
            title: t("ItemTitle6"),
            text: t("ItemText6"),
            iconColor: "text-red-400",
        },
        {
            id: 7,
            Icon: FaSyncAlt,
            title: t("ItemTitle7"),
            text: t("ItemText7"),
            iconColor: "text-gray-500",
        },
        {
            id: 8,
            Icon: FaHeadset,
            title: t("ItemTitle8"),
            text: t("ItemText8"),
            iconColor: "text-cyan-600",
        },
    ]
    return (
        <>
            <div id="fearhers-Section" className="h-[70px] w-full"></div>

            <div className=' px-20 mx-auto  '  >
                <SectionsTitle firstTitle={t("feathersTitle")} secondTitle={t("feathers2Title")} />
                <div className='grid grid-cols-2 gap-2  mt-5 w-full mb-7  justify-center items-center  '>
                    {
                        helps.map(help => (
                            <CardItems key={help.id}  {...help} />
                        ))
                    }
                </div>
                <div className="w-full flex flex-row justify-center items-center">
                    <ShopButton btnName={t("homeShopButton")} locale={locale} />
                </div>
            </div>
        </>
    )
}
