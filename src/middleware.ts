import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";


export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // لیست زبان‌های پشتیبانی‌شده
    const supportedLocales = ["fa", "en"];
    if (
        pathname.startsWith("/_next/") || // فایل‌های بیلد Next.js
        pathname.startsWith("/api/") || // مسیرهای API
        pathname.match(/\.(png|jpg|jpeg|gif|svg|woff|woff2|css|js|ico|rar)$/) || // فایل‌های استاتیک
        pathname.startsWith("/cms") // مسیرهای (admin)
    ) {
        return NextResponse.next();
    }

    // اگر مسیر دقیقاً / بود => ریدایرکت به /fa
    if (pathname === "/") {
        return NextResponse.redirect(new URL("/en", request.url));
    }

    // مسیر رو بررسی کن: آیا اولش یکی از locale ها هست؟
    const pathnameSegments = pathname.split("/").filter(Boolean);
    const firstSegment = pathnameSegments[0];

    const hasLocale = supportedLocales.includes(firstSegment);

    // اگر locale مشخص نشده (یعنی مسیر مثل /aboutus هست)، ریدایرکت کن به /fa/aboutus
    if (!hasLocale) {
        const newPath = ["/en", ...pathnameSegments].join("/");
        return NextResponse.redirect(new URL(newPath, request.url));
    }

    // مسیر درست بود => ادامه بده
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api|favicon.ico).*)"], // همه مسیرها به‌جز مسیرهای خاص
};
// "/((?!_next|api|favicon.ico|.*\\.(png|jpg|jpeg|gif|svg|css|js)).*)",

// export const config = {
//     matcher: [
//         /*
//          گارد احراز هویت فقط برای مسیرهای /admin (یا /cms)
//          زبان و فایل‌های static هم رد می‌شن
//         */
//         "/((?!_next|api|favicon.ico|.*\\.(png|jpg|jpeg|gif|svg|css|js)).*)",
//     ],
// };