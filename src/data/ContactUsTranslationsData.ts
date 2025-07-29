import { getTranslations } from '@/i18n/getTranslations';

export async function getContactUsTranslationsData(locale: string) {
    const t = await getTranslations(locale);

    const contactUsTranslations = {
        contactFormTitle: t('contactFormTitle'),
        name: t('nameAndFamily'),
        email: t('email'),
        phone: t('phone'),
        messeageText: t('messeageText'),
        buttonText: t('ButtonTextContactUs'),
    };

    const contactUsValData = {
        valContactUsNameRequir: t('valContactUsNameRequir'),
        ValContactUsNameMin: t('ValContactUsNameMin'),
        ValContactUsNameMax: t('ValContactUsNameMax'),
        valContactUsEmailRequir: t('valContactUsEmailRequir'),
        ValContactUsEmailNotValid: t('ValContactUsEmailNotValid'),
        valContactUsPhoneRequir: t('valContactUsPhoneRequir'),
        ValContactUsPhoneNotValid: t('ValContactUsPhoneNotValid'),
        ValContactUsPhoneNotMin: t('ValContactUsPhoneNotMin'),
        ValContactUsPhoneNotMax: t('ValContactUsPhoneNotMax'),
        valContactUsMessageRequir: t('valContactUsMessageRequir'),
        ValContactUsMessageMin: t('ValContactUsMessageMin'),
        ValContactUsMessageMax: t('ValContactUsMessageMax'),
        contactUsformSuccessMessage: t('contactUsformSuccessMessage'),
    };

    const mainData = {
        contactUsTitle: t('contactUsTitle'),
        Communicationmethods: t('Communication methods'),

    };

    return {
        contactUsTranslations,
        contactUsValData,
        mainData
    };
}