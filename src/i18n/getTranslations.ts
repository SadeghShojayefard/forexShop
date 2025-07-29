export async function getTranslations(locale: string) {
    const safeLocale = ["en", "fa"].includes(locale) ? locale : "fa";
    try {
        const messages = (await import(`./${safeLocale}.json`)).default;
        return (key: string) => messages[key] || key; // اگر کلید نبود، خود کلید رو برگردون
    } catch (error) {
        console.error(`Failed to load translations for ${safeLocale}:`, error);
        return (key: string) => key; // در صورت خطا، کلید رو برگردون
    }
}