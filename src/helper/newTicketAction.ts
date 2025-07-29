'use server';
import { newTicketSchema } from "@/validation/newTicketValidation";
import { parseWithZod } from "@conform-to/zod";
export async function newTicketAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: newTicketSchema(null),
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


