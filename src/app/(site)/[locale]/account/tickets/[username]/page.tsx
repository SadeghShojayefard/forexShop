import { LuMailCheck } from "react-icons/lu";
import { RiMailCloseLine } from "react-icons/ri";
import { IoMailOpenOutline } from "react-icons/io5";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CardItems from "@/components/share/cardItems/CardItems";
import Link from "next/link";
import { getTranslations } from "@/i18n/getTranslations";

export default async function TicketsPage({ params }: { params:Promise< { locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations(locale);

    return (
        <div className="w-full  flex flex-col justify-center items-center gap-2  text-start  pb-5 shadow-2xl shadow-black rounded-2xl px-2 ">
            <div className="w-full p-1 grid grid-cols-4 flex-row gap-5">
                <CardItems Icon={LuMailCheck} iconColor="text-lime-500" title={t("answeredTicket")} text="2" />
                <CardItems Icon={IoMailOpenOutline} iconColor="text-yellow-500" title={t("ticketUnderReview")} text="1" />
                <CardItems Icon={RiMailCloseLine} iconColor="text-red-500" title={t("closedTicket")} text="3" />

                <Link href={`/${locale}/account/newTicket/sadegh`} className='sm:col-span-full md:col-span-1 flex flex-row justify-evenly items-center w-full flex-wrap
          border-2 border-white/30 rounded-2xl 
           m-1 p-2 bg-white/30 backdrop-blur-md shadow-black shadow-xl hover:bg-sky-300  ' >
                    <p className='font-bold '>
                        {t("sendNewTicket")}
                    </p>
                    <AiOutlinePlusCircle size={30} color="blue" />

                </Link >


            </div>
            <div className="w-full flex flex-row rounded-xl border justify-start items-center gap-2 p-2 py-5 shadow shadow-black mt-5 ">
                <b>{t("totalTicket")} <span className="text-blue-500"> 3 </span></b>
            </div>
            <div className="w-full flex flex-col rounded-xl border justify-start items-center gap-2 p-2 py-5 shadow shadow-black mt-5 ">
                <Link href={`/${locale}/account/viewTicket/2314`} className="w-full flex flex-row rounded-xl border justify-between items-center gap-2 p-2 py-5 shadow shadow-black hover:bg-cyan-500  ">
                    <b>{t("ticketTitle")} <span className="text-blue-500"> 3 </span></b>
                    <p className="font-semibold ">{t("lastTicketData")} <span className="text-blue-500">1404/2/24 | 14:44:22</span></p>
                </Link>
                <Link href={`/${locale}/account/viewTicket/2314`} className="w-full flex flex-row rounded-xl border justify-between items-center gap-2 p-2 py-5 shadow shadow-black hover:bg-cyan-500  ">
                    <b>{t("ticketTitle")} <span className="text-blue-500"> 3 </span></b>
                    <p className="font-semibold ">{t("lastTicketData")} <span className="text-blue-500">1404/2/24 | 14:44:22</span></p>

                </Link>
                <Link href={`/${locale}/account/viewTicket/2314`} className="w-full flex flex-row rounded-xl border justify-between items-center gap-2 p-2 py-5 shadow shadow-black hover:bg-cyan-500 ">
                    <b>{t("ticketTitle")} <span className="text-blue-500"> 3 </span></b>
                    <p className="font-semibold ">{t("lastTicketData")} <span className="text-blue-500">1404/2/24 | 14:44:22</span></p>

                </Link>
            </div>
        </div>

    );
}
