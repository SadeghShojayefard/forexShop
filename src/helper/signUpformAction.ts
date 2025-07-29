'use server';
import dbConnect from "@/lib/db";
import { signUpSchema } from "@/validation/signUpValidation";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import { checkEmailExistAction, checkUserNameExistAction } from "./UserAction";
import { hashPassword } from "./sharedFunction";

import Users from "@/lib/models/users";


export async function signUpformAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: signUpSchema(null),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }

    try {
        await dbConnect();
        // ذخیره داده‌ها در دیتابیس
        const {
            username,
            email,
            password,
            password2
        } = subMission.value;

        const usernameResult = await checkUserNameExistAction(username);
        if (usernameResult.status === "success") {
            return {
                status: 'error',
                payload: {
                    message: 'username',
                },
            } as const;
        }

        const emailResult = await checkEmailExistAction(email);
        if (emailResult.status === "error") {
            return {
                status: 'error',
                payload: {
                    message: 'email',
                },
            } as const;
        }

        const encryptPassword = await hashPassword(password);

        await Users.create({
            username,
            email,
            password: encryptPassword,
            name: username,
            avatar: process.env.DEFAULT_AVATAR,
            role: process.env.DEFAULT_ROLE_ID,

        });



        // Revalidate مسیر صفحه برای به‌روزرسانی جدول
        revalidatePath('/cmsUsers');
        return {
            status: 'success',
            payload: {
                username,
                password,
            }
        } as const;

        // لاگین خودکار

        // return redirect(`/${subMission.value.locale}/account/profile/${subMission.value.username}`);

        // return redirect();

    } catch (error) {
        console.error('Error saving contact form:', error);
        return {
            status: 'error',
            payload: {
                message: '',
            },
        } as const;
    }
}


