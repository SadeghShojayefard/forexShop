import { FaStar, FaRegStar } from "react-icons/fa";
import KeenSliderMultiItem from "@/components/share/keenSliderMultiItem/KeenSliderMultiItem";
import { productDetailType } from "@/Type/productDetailType.type";
import { TbBrandTether } from "react-icons/tb";



const DetailSection: React.FC<productDetailType> = ({ img, productName, star, user, price, href, locale, discount }) => {
    return (
        <div className="grid grid-cols-2 w-full  flex-row flex-wrap gap-5 justify-between items-center 
         shadow-2xl shadow-black rounded-2xl p-2">
            <div className="sm:col-span-2  md:col-span-1   rounded-2xl  shadow shadow-black p-2">
                <h2 className="font-extrabold text-lg border-b w-full">
                    {locale === "fa" ?
                        <span>اندیکاتور: </span>
                        :
                        <span>Indicator Name: </span>
                    }

                    {productName}</h2>
                <p className=" text-lg border-b w-full">

                    {locale === "fa" ?
                        <b>تعداد کاربران: </b>
                        :
                        <b>User Number: </b>
                    }
                    {user.toLocaleString()}
                </p>

                <div className='flex flex-row justify-start items-center border-b w-full gap-2'>

                    {locale === "fa" ?
                        <p className=" font-bold text-lg  "> امتیاز: </p>
                        :
                        <p className=" font-bold text-lg  "> Score:</p>
                    }
                    {Array.from({ length: star }, (_, i) => (
                        <FaStar key={i} className="text-xl  text-yellow-300" />
                    ))}
                </div>
                <div className='flex flex-row justify-start items-center border-b w-full gap-2'>
                    <p className=" text-lg   flex flex-row flex-wrap justify-start items-center gap-2">
                        {locale === "fa" ?
                            <b>قیمت: </b>
                            :
                            <b>Price: </b>
                        }


                    </p>
                    {
                        discount === 0 ? (
                            <>
                                {
                                    price === 0 ?
                                        (<p className="flex flex-row justify-center items-center flex-wrap gap-1">
                                            {locale === "fa" ?
                                                <span>رایگان</span>
                                                :
                                                <span>FREE</span>
                                            }
                                        </p>)
                                        :
                                        (<p className="flex flex-row justify-center items-center flex-wrap gap-1"> {Number(price).toLocaleString()}
                                            {locale === "fa" ?
                                                <span >تومان</span>
                                                :
                                                <TbBrandTether />
                                            }
                                        </p>)
                                }
                            </>
                        )
                            :
                            (
                                <>
                                    <p className="flex flex-row justify-center items-center flex-wrap gap-1 line-through text-red-500"> {Number(price).toLocaleString()}
                                        {locale === "fa" ?
                                            <span >تومان</span>
                                            :
                                            <TbBrandTether />
                                        }
                                    </p>
                                    {
                                        price === 0 ?
                                            (<p className="flex flex-row justify-center items-center flex-wrap gap-1">
                                                {locale === "fa" ?
                                                    <span>رایگان</span>
                                                    :
                                                    <span>FREE</span>
                                                }
                                            </p>)
                                            :
                                            (<p className="flex flex-row justify-center items-center flex-wrap gap-1"> {Number(price).toLocaleString()}
                                                {locale === "fa" ?
                                                    <span >تومان</span>
                                                    :
                                                    <TbBrandTether />
                                                }
                                            </p>)
                                    }
                                </>
                            )

                    }
                </div>
                <a href={href} download className="flex flex-row justify-evenly items-center
                 bg-cyan-300 rounded-2xl shadow-2xl shadow-cyan-700 my-1 py-2
                 hover:bg-cyan-800 hover:text-white">

                    {locale === "fa" ?
                        <b>دانلود نسخه دمو</b>
                        :
                        <b>Download Demo Version</b>
                    }
                </a>
            </div>



            <div className="sm:col-span-2  md:col-span-1   rounded-2xl  shadow shadow-black overflow-hidden">
                <KeenSliderMultiItem slides={img} />
            </div>
        </div>
    )
}

export default DetailSection;