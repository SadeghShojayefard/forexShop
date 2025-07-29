import { getTranslations } from '@/i18n/getTranslations';

export async function getSignInTranslationsData(locale: string) {
    const t = await getTranslations(locale);

    const LoginTranslations = {
        signInTitle: t("signInTitle"),
        userName: t("userName"),
        password: t("password"),
        phone: t("phone"),
        login: t("login"),
    };

    const fogetTranslations = {
        passwordRecovery: t("passwordRecovery"),
        forgetPasswordText: t("forgetPasswordText"),
        close: t("close"),
        send: t("send"),
        userName: t("userName"),
        email: t("email"),
        forgetPasswordButton: t("forgetPassword")
    };

    const signUpTranslations = {
        signUpTitle: t("signUpTitle"),
        userName: t("userName"),
        email: t("email"),
        password: t("password"),
        repeatPassword: t("repeatPassword"),

    };

    const signInValTranslations = {
        valSignInUserNameRequir: t("valSignInUserNameRequir"),
        ValSignInUserNameMin: t("ValSignInUserNameMin"),
        ValSignInUserNameMax: t("ValSignInUserNameMax"),
        valSignInPasswordRequir: t("valSignInPasswordRequir"),
        ValSignInPasswordMin: t("ValSignInPasswordMin"),
        ValSignInPasswordMax: t("ValSignInPasswordMax"),
        signInError: t("signInError"),
    };

    const ForgetValTranslations = {
        valContactUsNameRequir: t("valContactUsNameRequir"),
        ValContactUsNameMin: t("ValContactUsNameMin"),
        ValContactUsNameMax: t("ValContactUsNameMax"),
        valContactUsEmailRequir: t("valContactUsEmailRequir"),
        ValContactUsEmailNotValid: t("ValContactUsEmailNotValid"),
        valForgetPassSuccesMessage: t("valForgetPassSuccesMessage"),
    };

    const signUpValTranslations = {
        valSignInUserNameRequir: t("valSignInUserNameRequir"),
        ValSignInUserNameMin: t("ValSignInUserNameMin"),
        ValSignInUserNameMax: t("ValSignInUserNameMax"),
        valContactUsEmailRequir: t("valContactUsEmailRequir"),
        ValContactUsEmailNotValid: t("ValContactUsEmailNotValid"),
        valSignInPasswordRequir: t("valSignInPasswordRequir"),
        ValSignInPasswordMin: t("ValSignInPasswordMin"),
        ValSignInPasswordMax: t("ValSignInPasswordMax"),
        valSignInConfirmPasswordRequir: t("valSignInConfirmPasswordRequir"),
        ValSignInConfirmPasswordMin: t("ValSignInConfirmPasswordMin"),
        ValSignInConfirmPasswordMax: t("ValSignInConfirmPasswordMax"),
        ValSignInConfirmPasswordNotMatch: t("ValSignInConfirmPasswordNotMatch"),
        usernameExistError: t("usernameExistError"),
        EmailExistError: t("EmailExistError"),
    }
    return {
        LoginTranslations,
        fogetTranslations,
        signUpTranslations,
        signInValTranslations,
        ForgetValTranslations,
        signUpValTranslations
    };
}