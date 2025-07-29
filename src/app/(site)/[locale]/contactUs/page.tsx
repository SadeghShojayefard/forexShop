import { SiGmail } from "react-icons/si";
import { FaTelegram } from "react-icons/fa";
import ContactUsForm from "@/components/site/contactUs/ContactUsForm";
import { getContactUsTranslationsData } from "@/data/ContactUsTranslationsData";

export default async function ContactUsPage({
    params,
}: {
    params: { locale: string };
}) {
    const { locale } = await params;
    const { contactUsTranslations, contactUsValData, mainData } = await getContactUsTranslationsData(locale);

    return (
        <div className="w-full  flex flex-col justify-center items-start gap-5 px-20 text-start my-20  ">
            <b>{mainData.contactUsTitle}</b>
            <div className="text-justify px-20 w-full">
                <p >
                    {mainData.Communicationmethods}
                </p>
                <div className="flex flex-row justify-start items-start gap-10">
                    <a href="mailto:iwantapp2023@gmail.com" className='bg-white/30 backdrop-blur-md border-2 border-blue-300 rounded-full p-1 no-underline
                            hover:bg-blue-400'>
                        <SiGmail size="30" color='red' />
                    </a>
                    <a href="https://t.me/ForexIndicatorPro" className='bg-white/30  backdrop-blur-md text-blue-400 border-2 border-blue-300 rounded-full  no-underline
                            hover:bg-blue-400 hover:text-blue-500'>
                        <FaTelegram size="38" />
                    </a>
                </div>
            </div>
            <div className=" flex flex-col justify-center items-center gap-2 w-full">
                <ContactUsForm
                    translate={{
                        locale,
                        Translation: contactUsTranslations,
                    }}
                    formValTranslate={contactUsValData}
                />
            </div>

        </div>
    );
}

