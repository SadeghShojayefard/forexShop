import '@/style/share/sectionsTitle.css'
import React from 'react'

type titlesText = {
    firstTitle: string;
    secondTitle: string;
};


function SectionsTitle(props: titlesText) {
    return (
        <div className="container mx-auto my-10 " >
            <div className='flex flex-wrap'>
                <div className="flex flex-row justify-between items-center w-full text-black text-center">
                    <h3 className='sections-title-style flex relative font-bold text-3xl m-0 p-0 text-black'>
                        {props.firstTitle}
                    </h3>

                </div>

            </div>



            <div className='flex flex-wrap'>
                <div className='w-full flex flex-row justify-between items-center text-black mt-5'>
                    <p className='font-extrabold text-lg'>
                        {props.secondTitle}
                    </p>


                </div>
            </div>
        </div>
    )
}

export default SectionsTitle;