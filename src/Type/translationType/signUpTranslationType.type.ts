

type signUpInterFace = {
    signUpTitle: string;
    userName: string;
    email: string;
    password: string;
    repeatPassword: string;

}

export type signUpTranslationType = {
    locale: string;
    Translation: signUpInterFace;
}

