'use server';
import { addUserShema } from "@/validation/addUserValidation";
import { parseWithZod } from "@conform-to/zod";
import { updateUserShema } from "@/validation/updateUserValidation";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/db";
import Users from "@/lib/models/users";
import { hashPassword } from "./sharedFunction";
import "@/lib/models/roles";
import { getRoleID } from "./userRoleAction";

//DEFAULT_ROLE_ID
// avtar:"Avatar/Default Avatar.png",
// /Avatar/Default Avatar.png
export async function AddUserAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: addUserShema(),
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

        } = subMission.value;

        const usernameResult = await checkUserNameExistAction(username);
        if (usernameResult.status !== "success") {
            console.log(subMission.value);

            return subMission.reply({
                fieldErrors: {
                    shortName: ["نام کاربری انتخاب شده تکراری است."],
                },
            });
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


export async function UserUpdateAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: updateUserShema(),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }
    const existData = await Users.findById(subMission.value.id);
    const newHashPassword = subMission.value.password === undefined || subMission.value.password === null ||
        subMission.value.password === "" ? existData.password : await hashPassword(subMission.value.password);

    const newName = subMission.value.name === null || subMission.value.name === undefined || subMission.value.name === "" ? existData.name : subMission.value.name;
    const newAvatar = subMission.value.avatar === null || subMission.value.avatar === undefined || subMission.value.avatar === "" ? existData.avatar : process.env.DEFAULT_AVATAR;
    const newRole = subMission.value.role === "user" ? process.env.DEFAULT_ROLE_ID :
        (getRoleID(subMission.value.role) === null ? process.env.DEFAULT_ROLE_ID : await getRoleID(subMission.value.role));

    const updatedProduct = await Users.findByIdAndUpdate(
        subMission.value.id,
        {
            $set: {
                username: subMission.value.username,
                email: subMission.value.email,
                password: newHashPassword,
                name: newName,
                avatar: newAvatar,
                role: newRole,
            }
        },
        { new: true } // برگرداندن داکیومنت آپدیت‌شده
    ).exec();
    revalidatePath('/cmsUsers');
    return {
        status: "success",
        payload: {
            message: "",
        },
    } as const;
}

export async function getAllUsers(page: number = 1, limit: number = 20) {

    try {
        await dbConnect();
        // محاسبه تعداد آیتم‌هایی که باید رد بشن
        const skip = (page - 1) * limit;

        // گرفتن داده‌ها با مرتب‌سازی و صفحه‌بندی
        const usersData = await Users.find({}, `_id username email name avatar role createdAt`)
            .sort({ createdAt: -1 }) // مرتب‌سازی نزولی بر اساس createdAt
            .skip(skip) // رد کردن آیتم‌های صفحات قبلی
            .limit(limit) // محدود کردن به 20 آیتم
            .populate("role", "titleEN")
            .lean()
            .exec();

        // گرفتن تعداد کل آیتم‌ها برای محاسبه تعداد صفحات
        const total = await Users.countDocuments();

        return {
            status: 'success',
            payload: {
                data: usersData.map((data: any) => ({

                    id: data._id.toString(), // تبدیل _id به string
                    username: data.username,
                    email: data.email,
                    name: data.name === "null" || data.name === "" ? "_" : data.name,
                    avatar: data.avatar,
                    role: data.role.titleEN,
                    createdAt: new Date(data.createdAt).toISOString(),
                })),
                pagination: {
                    page, // صفحه فعلی
                    limit, // تعداد آیتم‌ها در هر صفحه
                    total, // تعداد کل آیتم‌ها
                    totalPages: Math.ceil(total / limit), // تعداد کل صفحات
                },
            },
        } as const;
    } catch (error) {
        console.error('', error);
        return {
            status: 'error',
            payload: {
                data: [],
                pagination: {
                    page: 1,
                    limit: 20,
                    total: 0,
                    totalPages: 0,
                },
            },
        } as const;
    }
}


export async function checkUserNameExistAction(username: string) {
    await dbConnect();
    try {
        const existingUser = await Users.findOne({ username: username.trim() });
        if (existingUser) {
            return {
                status: 'error',
                data: {
                    id: existingUser._id.toString(),
                }
            };
        }
        return {
            status: 'success',
            data: {
                id: null,
            }
        };

    } catch (error) {
        return {
            status: 'error',
        };
    }
}

export async function checkEmailExistAction(email: string) {
    await dbConnect();
    try {
        const existingUser = await Users.findOne({ email: email.trim() });
        if (existingUser) {
            return {
                status: 'error',
            };
        }
        return {
            status: 'success',
        };
    } catch (error) {
        return {
            status: 'error',
        };
    }
}
