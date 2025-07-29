'use server';
import dbConnect from "@/lib/db";
import Roles from "@/lib/models/roles";
import { userRoleSchema } from "@/validation/userRoleValidation";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from 'next/cache';

export async function userRoleAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: userRoleSchema(),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }
    // return redirect(`/${subMission.value.locale}/account/profile/${subMission.value.userName}`);
    // اتصال به دیتابیس
    await dbConnect();

    try {
        // ذخیره داده‌ها در دیتابیس
        const { titleFA, titleEN } = subMission.value;
        await Roles.create({
            titleFA,
            titleEN,
        });

        // Revalidate مسیر صفحه برای به‌روزرسانی جدول
        revalidatePath('/cmsUserRoles');

        return {
            status: 'success',
            payload: {
                message: '',
            },
        } as const;
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


export async function getRoles() {
    await dbConnect();

    try {
        const roles = await Roles.find({}, 'titleFA titleEN').lean().exec();
        return {
            status: 'success',
            payload: roles.map((role: any) => ({
                id: role._id.toString(), // تبدیل _id به string
                titleFA: role.titleFA,
                titleEN: role.titleEN,
            })),
        } as const;
    } catch (error) {
        console.error('Error fetching roles:', error);
        return {
            status: 'error',
            payload: [],
        } as const;
    }
}

export async function getRoleID(role: String) {
    await dbConnect();

    try {
        const roleData = await Roles.findOne({ titleEN: role.trim() });
        if (role) { return roleData.id }
        else { return null; }
    } catch (error) {
        return null;
    }
}