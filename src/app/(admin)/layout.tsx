import Sidebar from "@/components/admin/sidebar/Sidebar";
import type { Metadata } from "next";
import localFont from 'next/font/local';
import "../globals.css";
import TopBar from "@/components/admin/topbar/TopBar";
import '@/style/site/signIn/signIn.css'
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ReduxProvider } from "@/providers/reduxProvider";


const vazir = localFont({
    src: "../../fonts/vazir.woff",
    variable: '--font-vazir',
    display: 'swap',
    weight: '100 300 500 700 900'
});

export const metadata: Metadata = {
    title: "فروشگاه اندیکاتور پرو",
};

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(options);
    if (!session || session.user.role !== "admin") {
        redirect(`/`);
    }
    return (
        <html lang="en">
            {/* ${geistSans.variable} ${geistMono.variable}   main-bg-color*/}
            <body className={` main-bg-color  font-vazir  ${vazir.variable}   `} dir="rtl" >
                <ReduxProvider>
                    <div className='flex flex-row bg-colors-white50' >
                        <Sidebar />
                        <div className='flex flex-col gap-1 w-full'>
                            <TopBar />
                            <div className="w-full min-h-[calc(100vh-60px)] flex flex-row items-center justify-start p-3">
                                {children}
                            </div>
                        </div>
                    </div>
                </ReduxProvider>
            </body>
        </html>
    );
}
