
import SectionsTitle from "@/components/share/SectionsTitle/SectionsTitle";
import KeenSlider from "@/components/share/keenSlider/KeenSlider";
import { getTranslations } from "@/i18n/getTranslations";

export default async function SelectedComments({ locale }: { locale: string }) {
    const t = await getTranslations(locale);


    return (
        <>
            <div className="px-20 mx-auto">
                <SectionsTitle firstTitle={t("selectedCommentsTitle")} secondTitle={t("selectedCommentsText")} />

            </div>
            <div className='  mt-5 w-full mb-12  bg-cover bg-center bg-fixed h-[400px]  
            flex flex-col gap-12 justify-center items-center relative shadow-xl shadow-black z-0'
                style={{ backgroundImage: "url('/SelectedCommentBG.png')" }}
            >

                <div className="absolute z-0 w-full h-full top-0 left-0 backdrop-blur-xs">

                </div>
                <div className="w-5/6 h-[400px] z-10 flex flex-col justify-center items-center">
                    <KeenSlider />
                </div>
            </div>


        </>
    )
}



