import { getTranslations } from "@/i18n/getTranslations";


export default async function AboutUsPage({ params }: { params: Promise<{ { locale: string }> }) {
    const { locale } = await  params;
    const t = await getTranslations(locale);


    return (
        <div className="w-full  flex flex-col justify-center items-start gap-5 px-20 text-start my-20">
            <b>
                {t("aboutUsTitle")}
            </b>
            <p className="text-justify px-20">
                {t("aboutUsParagraph1")}
            </p>
            <p className="text-justify px-20">
                {t("aboutUsParagraph2")}

            </p>
            <p className="text-justify px-20">
                {t("aboutUsParagraph3")}

            </p>
            <p className="text-justify px-20">
                {t("aboutUsParagraph4")}

            </p>
            <p className="text-justify px-20">
                {t("aboutUsParagraph5")}

            </p>
            <p className="text-justify px-20">
                {t("aboutUsParagraph6")}

            </p>

        </div>
    );
}




