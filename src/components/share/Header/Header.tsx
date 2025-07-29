"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaDollarSign } from "react-icons/fa";
import "@/style/share/siteHeader.css";
import { DialogTitle } from "@radix-ui/react-dialog";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import { useSession } from "next-auth/react";


interface Translations {
    home: string;
    store: string;
    aboutUs: string;
    contactUs: string;
    testAccount: string;
    language: string;
}

interface NavBarType {
    mobile?: boolean;
    translations: Translations;
    locale: string;
}

export default function Header({
    locale,
    // session,
    translations,
}: {
    locale: string;
    // session:
    // {
    //     avatar: string | undefined,
    //     username: string | undefined
    // };
    translations: Translations;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const changeLanguage = (locale: string) => {
        const newPath = pathname.replace(/^\/(en|fa)/, `/${locale}`);
        router.push(newPath);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleLogout = () => {
            // اگه logout از تب دیگه اومده بود، ریفرش یا ریدایرکت کن
            window.location.href = `/${locale}`; // یا window.location.reload();
        };

        window.addEventListener("storage", (event) => {
            if (event.key === "logout") {
                handleLogout();
            }
        });

        return () => {
            window.removeEventListener("storage", handleLogout);
        };
    }, []);
    const { data: session, status } = useSession();

    return (
        <header className="sticky top-0 w-full h-16 bg-white/30 backdrop-blur-md flex 
        justify-between items-center px-4 z-50 p-0 m-0 shadow-md shadow-black" key={"siteHeader"}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="md:hidden p-2 bg-gray-900 text-white rounded-md">
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side={`${locale === "fa" ? "right" : "left"}`}
                    className="w-64 h-full bg-white/70 backdrop-blur-md text-black flex flex-col gap-4 pt-10"
                >
                    <DialogTitle className="sr-only">هدر سایت</DialogTitle>
                    <NavBarMenu mobile translations={translations} locale={locale} />
                </SheetContent>
            </Sheet>

            <div className="mx-5">
                <Link href={`/${locale}`}>
                    <Image src="/logo.png" width={96} height={48} alt="site-logo" />
                </Link>
            </div>

            <div className="hidden md:flex flex-1 justify-center">
                <NavBarMenu translations={translations} locale={locale} />
            </div>

            <div className="flex flex-row gap-3 justify-center items-center">
                <div className="relative inline-block text-left">
                    <button
                        type="button"
                        className="flex flex-row justify-center items-center"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                    >
                        <AiOutlineGlobal size={45} className="text-blue-300 hover:text-blue-400 "
                        />

                    </button>
                    {isOpen && (
                        <div
                            className={`absolute ${locale === "fa" ? "left-0" : "right-0"} z-10 mt-2 w-56 origin-top-right rounded-md  bg-white/50  shadow-lg ring-1 ring-black/5 focus:outline-none`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                        >
                            <div className="py-1 " role="none">
                                <button
                                    onClick={() => changeLanguage("fa")}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 text-center font-semibold hover:bg-gray-50 "
                                    role="menuitem"
                                >
                                    فارسی
                                </button>
                                <button
                                    onClick={() => changeLanguage("en")}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 text-center font-semibold hover:bg-gray-50"
                                    role="menuitem"
                                >
                                    English
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {
                    session ?
                        (<Link href={`/${pathname.split("/")[1]}/account/profile/${session.user.username}`}   >
                            <Image
                                src={`${session.user.avatar}`}
                                width={50}
                                height={50}
                                alt="site-logo"
                                className="rounded-full shadow shadow-black"
                            />
                        </Link>)
                        :
                        (
                            <Link href={`/${pathname.split("/")[1]}/signin`}   >
                                <IoPersonCircleOutline
                                    size={50}
                                    className="text-blue-300 hover:text-blue-400"
                                />
                            </Link>
                        )
                }


            </div>
        </header>
    );
}

function NavBarMenu({ mobile = false, translations, locale }: NavBarType) {
    const pathname = usePathname();
    const routes = [
        { name: translations.home, href: `/${pathname.split("/")[1]}` },
        { name: translations.store, href: `/${pathname.split("/")[1]}/stor` },
        { name: translations.aboutUs, href: `/${pathname.split("/")[1]}/aboutUs` },
        { name: translations.contactUs, href: `/${pathname.split("/")[1]}/contactUs` },
    ];

    return (
        <nav
            className={`flex ${mobile ? "flex-col gap-4 items-start pr-2 text-right" : "flex-row gap-6 items-center"} text-base font-semibold`}
        >
            <ul
                className={`flex ${mobile ? `flex-col items-start gap-3 ${locale === "fa" ? "pr-4" : "pl-4"} ` : "flex-row items-center gap-6"}`}
            >
                {routes.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={isActive ? "active-menu flex items-center gap-1" : "group menu_a_tag flex items-center gap-1"}
                            >
                                <span>{item.name}</span>
                                <span className="menu_hover_animate"></span>
                                {isActive && <FaDollarSign size={20} color="yellow" />}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}