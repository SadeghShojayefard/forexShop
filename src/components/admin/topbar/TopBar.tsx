import React from 'react'
import { Button } from '@/components/ui/button';
import { Sun, BellRing } from 'lucide-react';
import Image from 'next/image';

export default function TopBar() {
    return (
        <div className='sm:w-full   flex flex-row  h-14 justify-between items-center  p-2 shadow-md sticky top-0 z-50 bg-white/30 backdrop-blur-2xl' >
            {/* right side */}
            <div className='flex flex-row gap-2 justify-start items-center my-2'>

                <Image
                    src="/logo.png"
                    width={40}
                    height={40}
                    alt="site-logo"
                    className="rounded-full shadow shadow-black"
                />
                <div className='flex-flex-col justify-between items-start p-2 '>
                    <p className='text-lg font-bold'>صادق شجاعی فرد</p>
                    <p className='text-sm text-gray-500'>مدیر سایت</p>
                </div>
            </div>

        </div>
    )
}
