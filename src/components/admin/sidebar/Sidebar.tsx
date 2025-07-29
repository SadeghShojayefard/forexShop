"use client"

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Home, ShoppingCart, Users, MessageSquare, Percent, Receipt, ShieldUser, PhoneOutgoing, Tickets } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideBarType } from "@/Type/SideBarType.type";
import { DialogTitle } from "@/components/ui/dialog";
import { useEffect } from "react";

export default function Sidebar() {
    const pathname = usePathname();

    useEffect(() => {
        const handleLogout = () => {
            // اگه logout از تب دیگه اومده بود، ریفرش یا ریدایرکت کن
            window.location.href = `/fa`; // یا window.location.reload();
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
    return (
        <div className="rtl flex  md:w-80 bg-white/30 backdrop-blur-2xl shadow-xl shadow-black">
            {/* دکمه باز کردن سایدبار در موبایل */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="fixed top-[60px] right-0 z-50 p-2 bg-gray-900 text-white rounded-md md:hidden">
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-72 bg-colors-menuBlue text-white  overflow-auto bg-white/30 backdrop-blur-2xl shadow-xl shadow-black">

                    <SidebarMenu pathname={pathname} />
                    <DialogTitle className="sr-only"> هدر سایت</DialogTitle>

                </SheetContent>
            </Sheet>

            {/* سایدبار ثابت برای دسکتاپ */}
            <div className="sticky top-0 hidden md:flex flex-col  h-screen flex-1 bg-colors-menuBlue shadow-xl shadow-black text-white overflow-auto">
                <SidebarMenu pathname={pathname} />
            </div>
        </div>
    );
}

function SidebarMenu({ pathname }: { pathname: string }) {
    return (
        <>
            <h2 className="text-xl font-semibold p-4 border-b-2 border-black mt-2 shadow-black shadow-md">به داشبورد خود خوش آمدید</h2>
            <ul className="mt-4 space-y-2">
                <SidebarItem pathname={pathname} href={'/'} Icon={Home} text="صفحه اصلی" firstChild={true} />

                <SidebarItem pathname={pathname} href={'/cmsProduct'} Icon={ShoppingCart} text="محصولات" />
                <SidebarItem pathname={pathname} href={'/cmsUserRoles'} Icon={ShieldUser} text="سطح دسترسی" />
                <SidebarItem pathname={pathname} href={'/cmsUsers'} Icon={Users} text="کاربران" />

                <SidebarItem pathname={pathname} href={'/cmsComments'} Icon={MessageSquare} text="نظرات" />
                <SidebarItem pathname={pathname} href={'/cmsTickets'} Icon={Tickets} text="تیکت‌ها" />
                <SidebarItem pathname={pathname} href={'/cmsContactUs'} Icon={PhoneOutgoing} text="تماس با ما" />
                <SidebarItem pathname={pathname} href={'/cmsOrders'} Icon={Receipt} text="سفارشات" />
                <SidebarItem pathname={pathname} href={'/cmsOffs'} Icon={Percent} text="تخفیف همگانی" />



            </ul>
        </>
    );
}

const SidebarItem: React.FC<SideBarType> = ({ Icon, text, href, firstChild = false, pathname }) => {
    const isActive: boolean = pathname === href;

    return (
        <li>
            <Link
                href={href}
                className={`flex items-center gap-2 px-4 py-1 text-lg rounded-md  transition-all duration-200 
                    ${isActive ? "bg-sky-800/20" : "hover:bg-sky-800/20"}
                      ${firstChild && "mb-6"} `}
            >
                <Icon className="w-5 h-5" />
                {text}
            </Link>
        </li>
    );
}

