

type ContactUsFormInterFace = {
    contactFormTitle: string;
    name: string;
    email: string;
    phone: string;
    messeageText: string;
    buttonText: string;
}

export type ContactUsFormType = {
    locale: string;
    Translation: ContactUsFormInterFace;
}