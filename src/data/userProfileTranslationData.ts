import { getTranslations } from '@/i18n/getTranslations';

export async function getUserProfileTranslationData(locale: string) {
    const t = await getTranslations(locale);


    const mainData = {
        accountUserInfo: t("accountUserInfo"),
        email: t("email"),
        userName: t("userName"),
        nameText: t("name"),
        accoutProfile: t('accoutProfile'),
    }

    const changePasswordTsData = {
        userName: t("userName"),
        accountChangePassword: t("accountChangePassword"),
        accountCurrentPassword: t("accountCurrentPassword"),
        accountNewPassword: t("accountNewPassword"),
        accountRepeatNewPassword: t("accountRepeatNewPassword"),
    }

    const changeAvatarTsData = {
        changeAvatar: t("changeAvatar"),
        newAvatar: t("newAvatar"),

    }

    const changePasswordValType = {
        valSignInUserNameRequir: t("valSignInUserNameRequir"),
        ValSignInUserNameMin: t("ValSignInUserNameMin"),
        ValSignInUserNameMax: t("ValSignInUserNameMax"),
        valCurrentPassword: t("valCurrentPassword"),
        valCurrentPassworRequir: t("valCurrentPassworRequir"),
        ValCurrentPassworMin: t("ValCurrentPassworMin"),
        ValCurrentPassworMax: t("ValCurrentPassworMax"),
        valSignInPasswordRequir: t("valSignInPasswordRequir"),
        ValSignInPasswordMin: t("ValSignInPasswordMin"),
        ValSignInPasswordMax: t("ValSignInPasswordMax"),
        valSignInConfirmPasswordRequir: t("valSignInConfirmPasswordRequir"),
        ValSignInConfirmPasswordMin: t("ValSignInConfirmPasswordMin"),
        ValSignInConfirmPasswordMax: t("ValSignInConfirmPasswordMax"),
        ValSignInConfirmPasswordNotMatch: t("ValSignInConfirmPasswordNotMatch"),
        valPasswordChangeMessage: t('valPasswordChangeMessage'),
    };

    const changeAvatarVal = {
        valNewAvatar: t("valNewAvatar"),
        valNewAvatarChange: t("valNewAvatarChange"),
        valAvatarTooLarge: t("valAvatarTooLarge"),
        valAvatarInvalidType: t("valAvatarInvalidType"),
    }

    const changeNameData = {
        changeName: t("changeName"),
        newName: t("newName"),
    }

    const changeNameVal = {
        valNameRequir: t("valNameRequir"),
        ValNameMin: t("ValNameMin"),
        ValNameMax: t("ValNameMax"),
        ValNameMaxSuccess: t("ValNameMaxSuccess"),
    }

    return {
        mainData,
        changePasswordTsData,
        changeAvatarTsData,
        changePasswordValType,
        changeAvatarVal,
        changeNameData,
        changeNameVal
    };
}