export type NavBarType = {
    mobile?: boolean;
    t: (key: string) => string; // یا (key: string) => any بسته به نوع دیتا
};