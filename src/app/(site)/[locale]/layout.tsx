import type { Metadata } from "next";
import localFont from "next/font/local";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import "../../globals.css";
import Header from "@/components/share/Header/Header";
import Footer from "@/components/share/Footer/Footer";
import ClickEffect from "@/components/share/clickEffect/ClickEffect";
import { getTranslations } from "@/i18n/getTranslations";
import AuthProvider from "@/providers/SessionProvider";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ReduxProvider } from "@/providers/reduxProvider";

// export const metadata: Metadata = {
//    title: "فروشگاه اندیکاتور پرو",
//    description: "محلی برای دریافت اندیکاتورهای حرفه‌ای و کسب سود مستمر.",
//   keywords: ["اندیکاتور", "ترید", "فارکس", "اندیکاتور پرو", "ترند", "ایچیموکو",
//     "ichimoku", "trend", "forox", 'trade', "Indicator Pro"],
// };

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  const title = t("siteTitle");
  const desc = t("siteDef")

  return {
    title: title,
    description: desc,
    keywords: ["اندیکاتور", "ترید", "فارکس", "اندیکاتور پرو", "ترند", "ایچیموکو",
      "ichimoku", "trend", "forox", 'trade', "Indicator Pro"]
  };
}

const vazir = localFont({
  src: "../../../fonts/vazir.woff",
  variable: "--font-vazir",
  display: "swap",
  weight: "100 300 500 700 900",
});

export default async function Layout({ children, params }: { children: React.ReactNode, params: { locale: string } }) {
  const { locale } = await params;
  // const session = await getServerSession(options);

  const t = await getTranslations(locale);
  const translations = {
    home: t("home"),
    store: t("store"),
    aboutUs: t("aboutUs"),
    contactUs: t("contactUs"),
    testAccount: t("testAccount"),
    language: t("language"),
  };
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir}>
      <body className={`main-bg-color font-vazir ${vazir.variable}`}>
        <ReduxProvider>
          {/* session={{ avatar: session?.user.avatar, username: session?.user.username }} */}
          <AuthProvider>
            <Header locale={locale} translations={translations} />
          </AuthProvider>
          {children}
          <a href="#" className="fixed left-5 bottom-5 bg-transparent z-10">
            <FaRegArrowAltCircleUp
              size={50}
              className="text-blue-400 hover:text-sky-700"
            />
          </a>
          <ClickEffect />
          <Footer locale={locale} />
        </ReduxProvider>
      </body>
    </html>
  );
}





