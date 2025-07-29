'use server';
import { commentUpdateSchema } from "@/validation/commentUpdateValidation";
import { sendCommentSchema } from "@/validation/sendCommentValidation";
import { parseWithZod } from "@conform-to/zod";
export async function sendCommentAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: sendCommentSchema(null),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }
    return {
        status: "success",
        payload: {
            message: "",
        },
    } as const;
}

export async function commentUpdateAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: commentUpdateSchema(),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }
    return {
        status: "success",
        payload: {
            message: "",
        },
    } as const;
}



