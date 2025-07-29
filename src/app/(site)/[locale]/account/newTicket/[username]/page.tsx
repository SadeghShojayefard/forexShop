
import NewTicket from "@/components/account/newTicket/NewTicket";
import Link from "next/link";
import { IoReturnUpBack } from "react-icons/io5";
import { getTranslations } from "@/i18n/getTranslations";

// export default function NewTicketsPage({ params }: { params: { locale: string; username: string } })
export default async function NewTicketsPage({ params }: { params: { locale: string; username: string }; }) {
    const t = await getTranslations(params.locale);

    const translation = {
        formTicketTitle: t("formTicketTitle"),
        formTicketText: t("formTicketText"),
        formTicketSend: t("formTicketSend"),
    }

    const ticketFormVal = {
        ticketTitleRequir: t("ticketTitleRequir"),
        ticketTextRequir: t("ticketTextRequir"),
        ticketTitleMin: t("ticketTitleMin"),
        ticketTitleMax: t("ticketTitleMax"),
        ticketTextMin: t("ticketTextMin"),
        ticketTextMax: t("ticketTextMax"),
        ticketSuccefull: t("ticketSuccefull"),
    }

    return (
        <div className="w-full  flex flex-col justify-center items-center gap-2  text-start  pb-5 shadow-2xl shadow-black rounded-2xl px-2 ">
            <div className="w-full flex flex-row rounded-xl border justify-between items-center gap-2 p-2 py-5 shadow shadow-black mt-5 ">
                <b>{t("sendNewTicket")}</b>
                <Link href={`/${params.locale}/account/tickets/sadegh`}
                    className="flex flex-row flex-wrap justify-center items-center gap-2 border p-1 rounded-xl shadow shadow-black
                    hover:bg-sky-300">{t("back")}
                    <IoReturnUpBack color="blue" size="30" />
                </Link>
            </div>
            <NewTicket translate={translation} username={params.username} valTranslate={ticketFormVal} locale={params.locale} />
        </div>

    );
}
