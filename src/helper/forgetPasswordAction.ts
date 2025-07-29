'use server';
import { forgetPasswordShema } from "@/validation/forgetPasswordValidation";
import { parseWithZod } from "@conform-to/zod";
export async function forgetPasswordAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: forgetPasswordShema(null),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }
    // return redirect(`/${subMission.value.locale}/account/profile/${subMission.value.userName}`);
    return {
        status: "success",
        payload: {
            message: "",
        },
    } as const;
}


