'use server';
import { SignInSchema } from "@/validation/signInValidation";
import { parseWithZod } from "@conform-to/zod";
export async function SignInFormAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: SignInSchema(null),
    });




    if (subMission.status !== "success") {
        return subMission.reply();
    }
    return {
        status: 'success',
        payload: {
            username: subMission.value.userName,
            password: subMission.value.password,
        }
    } as const;
}


