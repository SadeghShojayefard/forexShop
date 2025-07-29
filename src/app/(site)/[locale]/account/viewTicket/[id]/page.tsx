
import TicketContent from "@/components/account/ticketContent/TicketContent";
import AnswerTicketAC from "@/components/account/answerTicketAC/AnswerTicketAC";
import { getTranslations } from "@/i18n/getTranslations";
export default async function ViewTicketsPage({ params }: { params: { locale: string } }) {
    const { locale } = await params;
    const t = await getTranslations(locale);

    const sampleData = [{
        id: 1,
        author: 'user',
        date: '1404/10/20 | 10:20:30',
        text: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
                                        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                                        شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی
                                        می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه
                                        و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                                        ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                                        صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط
                                        سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی،
                                        و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
    },
    {
        id: 2,
        author: 'پاسخ دهنده 5',
        date: '1404/10/21 | 12:30:00',
        text: `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
                                        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                                        شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی
                                        می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامع که تمام و دشواری موجود در ارائه راهکارها، و شرایط
                                        سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی،
                                        و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.`,
    },
    {
        id: 3,
        author: 'user',
        date: '1404/10/20 | 10:20:30',
        text: 'این یک کامنت اصلی است',
    },
    {
        id: 4,
        author: 'کاربر اصلی',
        date: '1404/10/20 | 10:20:30',
        text: 'این یک کامنت اصلی است',
    },
    {
        id: 5,
        author: 'کاربر اصلی',
        date: '1404/10/20 | 10:20:30',
        text: 'این یک کامنت اصلی است',
    },
    {
        id: 6,
        author: 'user',
        date: '1404/10/20 | 10:20:30',
        text: 'این یک کامنت اصلی است',
    },
    {
        id: 7,
        author: 'کاربر اصلی',
        date: '1404/10/20 | 10:20:30',
        text: 'این یک کامنت اصلی است',
    },
    ]
    const translate = {
        answerTicket: t("answerTicket"),
        answerText: t("answerText"),
        sendAnswer: t("sendAnswer"),
        answerPlaceholder: t("answerPlaceholder"),
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
        <div className="w-full  flex flex-col justify-start items-start gap-2   py-5 shadow-2xl shadow-black rounded-2xl px-2 ">
            <div className="w-full flex flex-row items-center justify-start px-2 font-bold text-xl border-b   ">
                <b className="pb-2">{t("formTicketTitle")}</b>
            </div>
            {
                sampleData.map(item => (
                    <TicketContent key={item.id}  {...item} locale={locale} support={t("support")} />
                ))
            }
            <AnswerTicketAC translate={translate} valTranslate={ticketFormVal} locale={locale} />
        </div>

    );
}
