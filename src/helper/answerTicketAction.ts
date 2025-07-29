'use server';
import { answerTicketSchema } from "@/validation/answerTicketValidation";
import { parseWithZod } from "@conform-to/zod";
export async function answerTicketAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: answerTicketSchema(null),
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


