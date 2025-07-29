import React from 'react'
import Image from 'next/image'
export default function SlideShowHomeItem() {
    return (
        <>
            <div className='flex flex-col gap-12 justify-center items-center z-10 w-full h-full '>

                <div className="w-4/6 mx-auto">
                    <div className="relative  border-blue-900 bg-white/30 border-2 backdrop-blur-md p-4 rounded-lg">
                        <p className="text-blue-900">
                            تست تست تست تست تست تست تست تست تست تست تست
                            تست تست تست تست تست تست تست تست تست تست تست
                            تست تست تست تست تست تست تست تست تست تست تست
                            تست تست تست تست تست تست تست تست تست تست تست
                            تست تست تست تست تست تست تست تست تست تست تست
                        </p>

                        {/* دم حباب */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-[42px] border-transparent
border-t-white/40   backdrop-blur-md"></div>
                    </div>
                </div>


                <div className="flex flex-row items-center justify-center gap-2 border-blue-900 border-2  bg-white/30 backdrop-blur-md
rounded-2xl P-2">
                    <b className="text-white p-2">
                        مت براندون
                    </b>
                    <div className="rounded-full bg-blue-300/50 m-2 ">

                        <Image
                            src={`/logo.png`}
                            width={75}
                            height={75}
                            alt={'asdasd'}
                        />
                    </div>
                </div>
            </div>

        </>

    )
}
