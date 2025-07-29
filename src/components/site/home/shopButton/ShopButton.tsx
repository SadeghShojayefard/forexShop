import Link from 'next/link';
import { FaShopify } from "react-icons/fa";


export default function ShopButton({ btnName, locale }: { btnName: string; locale: string }) {

    return (
        <>
            <Link href={`${locale}/stor`} role="button"
                className=" rounded-full  flex flex-row justify-center items-center gap-2
                 bg-blue-500 text-yellow-500 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)]
              hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]
               focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]
                active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]
                 px-8 pb-2 pt-2.5 font-bolder text-2xl  leading-normal transition duration-150 ease-in-out
                  focus:outline-none focus:ring-0">

                {btnName}
                <FaShopify color='yellow' />
            </Link>
        </>
    )
}
