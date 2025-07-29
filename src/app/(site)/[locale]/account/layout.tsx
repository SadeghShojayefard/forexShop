
import '@/style/account/menu.css'
import '@/style/site/signIn/signIn.css'
import AccountSidebar from "@/components/account/sideBar/SideBar";
import { getTranslations } from "@/i18n/getTranslations";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import AuthProvider from '@/providers/SessionProvider';


export default async function AccountLayout({ children, params }: { children: React.ReactNode, params: { locale: string } }) {
    const { locale } = await params;

    const t = await getTranslations(locale);
    const translations = {
        accoutProfile: t("accoutProfile"),
        accountOrders: t("accountOrders"),
        accountTickets: t("accountTickets"),
        accountAdmin: t("accountAdmin"),
        accountExit: t("accountExit"),
    };
    const session = await getServerSession(options);
    if (!session) {

        redirect(`/${locale}/signin`);
    }
    return (
        <>
            <AuthProvider>
                <div className="flex flex-row justify-start items-center  my-20  rounded-2xl 
        shadow-2xl shadow-black bg-white/30 backdrop-blur-md  ">
                    <div className="grid grid-cols-10 w-full  rounded-2xl gap-2 ">

                        <AccountSidebar locale={locale} translate={translations}
                            avatar={session.user.avatar} username={session.user.username} role={session.user.role} />

                        <div className="sm:col-span-10 md:col-span-9   flex flex-col justify-start items-center   w-full rounded-2xl p-2">
                            {children}

                        </div>
                    </div>
                </div>
            </AuthProvider>
        </>
    );
}


