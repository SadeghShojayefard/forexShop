import '@/style/site/signIn/signIn.css'
import LoginForm from "@/components/site/signIn/LoginForm";
import SignUpForm from "@/components/site/signIn/SignUpForm";
import PaperEffect from '@/components/site/signIn/PaperEffect';
import { getSignInTranslationsData } from '@/data/signInTranslationsData';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export default async function SignInPage({ params }: { params: { locale: string } }) {
    const { locale } = await params;
    const {
        LoginTranslations,
        fogetTranslations,
        signUpTranslations,
        signInValTranslations,
        ForgetValTranslations,
        signUpValTranslations
    } = await getSignInTranslationsData(locale);

    const session = await getServerSession(options);
    if (session) {
        redirect(`/${locale}`);
    }


    return (
        <div className="relative w-full h-[calc(100vh-65px)] flex">


            <PaperEffect />

            <SignUpForm translate={{
                locale: locale,
                Translation: signUpTranslations,
            }}
                valTranslate={signUpValTranslations} />

            <LoginForm translate={{
                locale: locale,
                Translation: LoginTranslations,

            }}
                forgetTranslation={{
                    locale: locale,
                    Translation: fogetTranslations,
                }}
                signInValTranslations={signInValTranslations}
                ForgetValTranslations={ForgetValTranslations}
            />


        </div>
    );
}
