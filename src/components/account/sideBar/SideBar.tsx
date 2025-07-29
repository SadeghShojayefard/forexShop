"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";
import { accountSideBarType } from "@/Type/translationType/accountSideBarType.type";
import { signOut } from "next-auth/react";

export default function AccountSidebar({
    locale,
    avatar,
    username,
    role,
    translate,
}: {
    locale: string;
    avatar: string;
    username: string,
    role: string,
    translate: accountSideBarType
}) {
    const pathname = usePathname();


    return (
        <div className="sm:col-span-10 md:col-span-1  flex flex-col justify-start items-center  
                        rounded-2xl border border-sky-700 shadow shadow-black gap-1 p-1 w-full md:h-80 md:sticky md:top-[70px] ">
            <Image
                src={avatar}
                width={75}
                height={75}
                alt="site-logo"
                className="rounded-full shadow shadow-black"
            />
            <p className="w-full text-center my-2 font-bold text-xl text-shadow-md text-shadow-cyan-300 border-b">
                {username}
            </p>
            <AccountMenu translate={translate} locale={locale} username={username} role={role} />
        </div>
    );
}


function AccountMenu({ translate, locale, username, role }:
    { translate: accountSideBarType, locale: string, username: string, role: string }) {
    const pathname = usePathname();
    console.log(pathname);
    const routes = [
        { name: translate.accoutProfile, href: `/${pathname.split("/")[1]}/account/profile/${username}` },
        { name: translate.accountOrders, href: `/${pathname.split("/")[1]}/account/orders/${username}` },
        { name: translate.accountTickets, href: `/${pathname.split("/")[1]}/account/tickets/${username}` },
        { name: translate.accountAdmin, href: '/cmsProduct', },
        { name: translate.accountExit, href: `#`, func: true },
    ];
    const logoutUser = () => {
        localStorage.setItem("logout", Date.now().toString());
        signOut({
            callbackUrl: `/${locale}`
        })
    }
    return (
        <ul className={`flex  flex-col items-start gap-2  w-full mb-5`}>

            {routes.map((item) => {
                const isActive = pathname === item.href;

                if (item.href === "/cmsProduct") {
                    return role === "admin" && (
                        <li key={item.href} className="w-full shadow flex flex-row justify-center items-center">
                            <Link
                                href={item.href}
                                className={`w-full border shadow-md shadow-black ${isActive ? "bg-sky-300" : "hover:bg-cyan-500"} 
                    ${locale === "fa" ? "pr-2" : "pl-2"} rounded-md text-justify`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                }

                return (
                    <li key={item.href} className="w-full shadow flex flex-row justify-center items-center">
                        <Link
                            href={item.href}
                            className={`w-full border shadow-md shadow-black ${isActive ? "bg-sky-300" : "hover:bg-cyan-500"} 
                ${locale === "fa" ? "pr-2" : "pl-2"} rounded-md text-justify`}
                            onClick={(e) => {
                                if (item.func) {
                                    e.preventDefault();
                                    logoutUser();
                                }
                            }}
                        >
                            {item.name}
                        </Link>
                    </li>
                );
            })}


        </ul >
    )
}
