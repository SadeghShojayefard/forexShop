import { FaStar, FaRegStar } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { productType } from "@/Type/productType.type";
import { TbBrandTether } from "react-icons/tb";

//
const ProductBox: React.FC<productType> = ({ img, productName, star, user, price, href, locale, linkText, discount }
) => {

    // const [isImgLoading, setIsImgLoading] = useState(true);

    // const onImageLoaded = () => setIsImgLoading(false);

    return (
        <div className='w-full h-full p-0    flex flex-col
        rounded-2xl flex-1  bg-white/30 backdrop-blur-md shadow-black shadow-xl' >

            <Link href={`/${locale}/productDetail/${href}`} className="no-underline relative">

                <Image
                    src={`${img}`}
                    width={0}
                    height={0}
                    sizes="100%"
                    alt={productName}
                    quality={100}
                    className='w-full rounded-2xl p-1'
                />
            </Link>
            <div className='flex flex-col flex-1 justify-between p-3 '>
                <div className='w-full flex justify-center items-center'>
                    <Link href={`/${locale}/productDetail/${href}`} className=' text-lg no-underline text-gray-950 font-bold text-center'>
                        {productName}
                    </Link>
                </div>
                <div>

                    <div className='w-full flex flex-row-reverse justify-between items-center'>

                        <div className='flex flex-row items-center gap-2'>

                            {Array.from({ length: star }, (_, i) => (
                                <FaStar key={i} className="text-xl  text-yellow-300" />
                            ))}
                        </div>
                    </div>



                    <div className='w-full flex flex-row justify-between items-center m-2'>
                        <div className='w-full flex flex-row flex-wrap justify-between items-center'>
                            <p className='no-underline text-gray-950 flex items-center '>
                                <BsPeople className=' text-xl mx-1 text-gray-950' />
                                {Number(user).toLocaleString()}
                            </p>
                            <div className="text-blue-900">
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
                        </div>
                    </div>


                    <hr />
                    <div className='w-full flex flex-row justify-center items-center'>
                        <Link href={`/${locale}/productDetail/${href}`} className={`flex ${locale === "fa" ? "flex-row" : "flex-row-reverse"} 
                         justify-center  items-center text-lg no-underline text-blue-900 font-bold `}>
                            {linkText}
                            <MoveLeft className=' text-xl mx-3 ' />
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProductBox;