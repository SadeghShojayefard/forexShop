'use server';
import { changeAvatarSchema } from "@/validation/changeAvatarValidation";
import { parseWithZod } from "@conform-to/zod";
import Users from "@/lib/models/users";
import dbConnect from "@/lib/db";
import path from 'path';
import fs from 'fs/promises';
import { deleteFileFromServer, uploadFileOnServer } from "./sharedFunction";
import { changeNameSchema } from "@/validation/changeNameValidation";

const IndicatorFile = path.join(process.cwd(), 'public', 'Avatar');
fs.mkdir(IndicatorFile, { recursive: true }); // اطمینان از وجود پوشه

export async function changeAvatarAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: changeAvatarSchema(null),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }

    try {
        await dbConnect();
        // ذخیره داده‌ها در دیتابیس
        const {
            username,
            avatar
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

        await deleteFileFromServer(existingUser.Avatar);
        let avatarPath = await uploadFileOnServer(avatar, "Avatar");

        await Users.findByIdAndUpdate(
            existingUser._id,
            {
                $set: {
                    avatar: avatarPath,
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
        return {
            status: 'error',
            payload: {
                message: "",
            },
        } as const;
    }
}


export async function changeNameAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: changeNameSchema(null),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }

    try {
        await dbConnect();
        // ذخیره داده‌ها در دیتابیس
        const {
            username,
            name
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



        await Users.findByIdAndUpdate(
            existingUser._id,
            {
                $set: {
                    name: name,
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
        return {
            status: 'error',
            payload: {
                message: "",
            },
        } as const;
    }
}


