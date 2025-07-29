'use server';
import dbConnect from "@/lib/db";
import { changePasswordSchema } from "@/validation/changePassword";
import { parseWithZod } from "@conform-to/zod";
import Users from "@/lib/models/users";
import { comparePassword, hashPassword } from "./sharedFunction";

export async function changePasswordAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: changePasswordSchema(null),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }

    try {
        await dbConnect();
        // ذخیره داده‌ها در دیتابیس
        const {
            username,
            currentPassword,
            newPassword,
            newPassword2
        } = subMission.value;

        const existingUser = await Users.findOne({ username: username.trim() });
        if (!existingUser) {
            return {
                status: 'error',
                payload: {
                    message: "userNotExist",
                },
            } as const;
        }

        const currentPasswordResult = await comparePassword(currentPassword, existingUser.password);
        if (!currentPasswordResult) {
            return {
                status: 'error',
                payload: {
                    message: "oldPassword",
                },
            } as const;
        }

        const encryptPassword = await hashPassword(newPassword);

        await Users.findByIdAndUpdate(
            existingUser._id,
            {
                $set: {
                    password: encryptPassword,
                }
            },
        ).exec();

        return {
            status: "success",
            payload: {
                message: "",
            },
        } as const;
    }
    catch (error) {
        console.error('Error saving contact form:', error);
        return {
            status: 'error',
            payload: {
                message: '',
            },
        } as const;
    }
}