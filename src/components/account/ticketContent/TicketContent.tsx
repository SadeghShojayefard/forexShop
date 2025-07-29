
import { CommentType } from "@/Type/CommentType.type";
import { ticketContentTranslationType } from "@/Type/translationType/ticketContentTranslationType.type";

const TicketContent: React.FC<CommentType & ticketContentTranslationType> = ({ author, date, text, locale, support }) => {
    return (
        <>
            <div className="w-full grid grid-cols-2 items-start justify-start my-2">

                {
                    author === "user" ?
                        <>
                            <div className="sm:col-span-full md:col-end-2  flex flex-col justify-start items-start gap-2   py-5 shadow-2xl shadow-black rounded-2xl px-2 ">
                                <div className="w-full  flex flex-col items-center justify-start px-2    ">
                                    <p className="pb-2 border-b text-justify w-full">
                                        {text}
                                    </p>
                                    <p className="w-full text-left mt-2">{date}</p>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="sm:col-span-full md:col-start-2  flex flex-col justify-start items-start gap-2
                               py-5 shadow-2xl shadow-black rounded-2xl px-2  bg-sky-500/30 backdrop-blur-xl">
                                <div className="w-full  flex flex-col items-center justify-start px-2   ">
                                    <b className={`w-full border-b pb-2 ${locale === "fa" ? "text-right" : "text-left"}`}>{support}</b>
                                    <p className="pb-2 border-b text-justify w-full">
                                        {text}
                                    </p>
                                    <p className={`w-full  mt-2  ${locale === "fa" ? "text-left" : "text-right"} `}>{date}</p>
                                </div>
                            </div>
                        </>
                }


            </div>
        </>


    );
}
export default TicketContent;