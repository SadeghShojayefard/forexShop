
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from "lucide-react"
import DetailSection from "@/components/site/productDetail/detailSection/DetailSection";
import DefinitionSection from "@/components/site/productDetail/definitionSection/DefinitionSection";
import CommentSection from "@/components/site/productDetail/commentSection/CommentSection";
import CommentParent from "@/components/site/productDetail/commentParent/CommentParent";
import { getTranslations } from "@/i18n/getTranslations";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import { getOneProduct } from "@/helper/productAction";

export default async function ProductDetailPage({ params }: { params: { locale: string, shortName: string } }) {
    const { locale, shortName } = await params;
    const t = await getTranslations(locale)

    const session = await getServerSession(options);


    const sampleData = [{
        id: 1,
        author: 'کاربر اصلی',
        date: '1404/10/20 | 10:20:30',
        text: 'این یک کامنت اصلی است',
        replies: [
            {
                id: 2,
                author: 'پاسخ دهنده ۱',
                date: '1404/10/21 | 11:00:00',
                text: 'این یک پاسخ است',
                replies: [
                    {
                        id: 3,
                        author: 'پاسخ به پاسخ',
                        date: '1404/10/22 | 12:00:00',
                        text: 'این یک پاسخ به پاسخ است',
                    },
                ],
            },
            {
                id: 4,
                author: 'پاسخ دهنده ۲',
                date: '1404/10/21 | 12:30:00',
                text: 'پاسخ دوم',
            },
            {
                id: 5,
                author: 'پاسخ دهنده 5',
                date: '1404/10/21 | 12:30:00',
                text: 'پاسخ چنجم',
            },
        ],
    },
    {
        id: 15,
        author: 'پاسخ دهنده 5',
        date: '1404/10/21 | 12:30:00',
        text: 'پاسخ چنجم',
    },
    {
        id: 11,
        author: 'کاربر اصلی',
        date: '1404/10/20 | 10:20:30',
        text: 'این یک کامنت اصلی است',
        replies: [
            {
                id: 12,
                author: 'پاسخ دهنده ۱',
                date: '1404/10/21 | 11:00:00',
                text: 'این یک پاسخ است',
                replies: [
                    {
                        id: 13,
                        author: 'پاسخ به پاسخ',
                        date: '1404/10/22 | 12:00:00',
                        text: 'این یک پاسخ به پاسخ است',
                    },
                ],
            },
            {
                id: 14,
                author: 'پاسخ دهنده ۲',
                date: '1404/10/21 | 12:30:00',
                text: 'پاسخ دوم',
            },
            {
                id: 45,
                author: 'پاسخ دهنده 5',
                date: '1404/10/21 | 12:30:00',
                text: 'پاسخ چنجم',
            },
        ],
    },
    ]

    const commentForm = {
        commentTitle: t("commentTitle"),
        commentSignInError: t("commentSignInError"),
        commentStar: t("commentStar"),
        sendComment: t("sendComment"),
    }

    const valTranslate = {
        commentTextRequir: t("commentTextRequir"),
        commentTextMin: t("commentTextMin"),
        commentTextMax: t("commentTextMax"),
        commentSuccefull: t("commentSuccefull"),
    };

    const productData = await getOneProduct(shortName);
    const pData = productData?.payload?.data;
    const slides = pData?.slideImage;
    slides.push(pData?.mainImage);
    slides.reverse();
    return (
        <>
            {productData?.status === 'success' ?
                (
                    <div className="w-full  flex flex-col flex-wrap justify-center items-start gap-5 px-20 text-start my-20  ">
                        <div className="w-full flex flex-row justify-start items-center">
                            <Breadcrumb className="font-bold ">
                                <BreadcrumbList className=" bg-white/30 backdrop-blur-2xl py-1 px-2 rounded-2xl">
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`/${locale}`} >{t("home")}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {locale === "fa" ?
                                        <BreadcrumbSeparator>
                                            <Slash />
                                        </BreadcrumbSeparator>
                                        :
                                        <BreadcrumbSeparator />
                                    }
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={`/${locale}/stor`}>{t("store")}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {locale === "fa" ?
                                        <BreadcrumbSeparator>
                                            <Slash />
                                        </BreadcrumbSeparator>
                                        :
                                        <BreadcrumbSeparator />
                                    }
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{t("productDetail")}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <h3 className="font-extrabold text-2xl"> {t("productDetail")}</h3>
                        <div className=" w-full flex flex-col justify-center items-center gap-5  ">
                            <DetailSection productName={pData?.name} user={pData?.userCount} star={pData?.score}
                                price={(locale === "fa" ? pData?.finalPriceToman : pData?.finalPriceTether)}
                                href={pData?.indicatorFile} img={slides} locale={locale} discount={pData?.discount}
                            />

                            <DefinitionSection title={t("definition")} bit64={t("64bit")}
                                text={(locale === "fa" ? pData?.textFA : pData?.textEn)} locale={locale} />

                            {
                                !session ? (
                                    <div className="w-full flex text-dark p-5 rounded-2xl gap-2  justify-center items-center my-5 shadow-2xl shadow-black  ">
                                        {
                                            locale === "fa" ?
                                                (<p>لطفا برای کامنت گذاشتن ابتدا وارد شوید</p>) :
                                                (<p>please signIn first for comment</p>)
                                        }
                                        <Link href={`/${locale}/signin`} className="text-white bg-cyan-800/30 backdrop-blur-3xl border-2 p-2
                             border-sky-300  rounded-md shadow-md shadow-cyan-400 hover:bg-cyan-600/30">ورود/ثبت نام</Link>
                                    </div>
                                ) : (
                                    <CommentSection translate={commentForm} locale={locale} valTranslate={valTranslate} />

                                )
                            }


                            <div className="w-full flex text-dark p-5 rounded-2xl   justify-center items-center my-5 shadow-2xl shadow-black  ">
                                <CommentParent comments={sampleData} locale={locale} />
                            </div>
                        </div>

                    </div>
                )
                :
                (
                    <div className="w-full  flex flex-col flex-wrap justify-center items-center gap-5 px-20 text-start my-20  h-96 ">
                        <p className="font-bold" >محصولی با این مشخصات وجود ندارد</p>
                    </div>
                )


            }

        </>
    )
}
