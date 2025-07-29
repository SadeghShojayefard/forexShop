'use server';
import dbConnect from "@/lib/db";
import { AddOrderSchema } from "@/validation/AddOrderValidation";
import { parseWithZod } from "@conform-to/zod";
import { checkUserNameExistAction } from "./UserAction";
import { checkMainNameAction } from "./productAction";
import { revalidatePath } from "next/cache";
import { updateOrderSchema } from "@/validation/updateOrderValidation";
import { productChangePublishStatueSchema } from "@/validation/productChangePublishStatueValidation";
import "@/lib/models/users";
import "@/lib/models/products";
import "@/lib/models/orders";
import Orders from "@/lib/models/orders";


export async function orderAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: AddOrderSchema(),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }

    try {
        await dbConnect();
        // ذخیره داده‌ها در دیتابیس
        const {
            username,
            product,
            count,
        } = subMission.value;

        const usernameResult = await checkUserNameExistAction(username);
        if (usernameResult.status === "true") {
            return subMission.reply({
                fieldErrors: {
                    shortName: [""],
                },
            });
        }
        const productResult = await checkMainNameAction(product);
        if (productResult.status === "true") {
            return subMission.reply({
                fieldErrors: {
                    product: [""],
                },
            });
        }

        await Orders.create({
            user: usernameResult.data?.id,
            product: productResult.data?.id,
            count: Number(count),
            price: Number(productResult.data?.finalPrice),
            totalPrice: Number(productResult.data?.finalPrice * count),
        });



        // Revalidate مسیر صفحه برای به‌روزرسانی جدول
        revalidatePath('/cmsOrders');
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


export async function orderUpdateAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: updateOrderSchema(),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }

    try {
        await dbConnect();

        const {
            id,
            username,
            product,
            count,
        } = subMission.value;

        const usernameResult = await checkUserNameExistAction(username);
        if (usernameResult.status === "success") {
            return subMission.reply({
                fieldErrors: {
                    shortName: [""],
                },
            });
        }

        const productResult = await checkMainNameAction(product);
        if (productResult.status === "success") {
            return subMission.reply({
                fieldErrors: {
                    product: [""],
                },
            });
        }

        const updatedOrders = await Orders.findByIdAndUpdate(
            id,
            {
                $set: {
                    user: usernameResult.data?.id,
                    product: productResult.data?.id,
                    count: Number(count),
                    price: Number(productResult.data?.finalPrice),
                    totalPrice: Number(productResult.data?.finalPrice * count),
                }
            },
            { new: true } // برگرداندن داکیومنت آپدیت‌شده
        ).exec();

        // Revalidate مسیر صفحه برای به‌روزرسانی جدول
        revalidatePath('/cmsOrders');
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

export async function getAllOrders(page: number = 1, limit: number = 20) {

    try {
        await dbConnect();
        // محاسبه تعداد آیتم‌هایی که باید رد بشن
        const skip = (page - 1) * limit;

        // گرفتن داده‌ها با مرتب‌سازی و صفحه‌بندی
        const ordersData = await Orders.find({}, `_id user product count price totalPrice createdAt `)
            .sort({ createdAt: -1 }) // مرتب‌سازی نزولی بر اساس createdAt
            .skip(skip) // رد کردن آیتم‌های صفحات قبلی
            .limit(limit) // محدود کردن به 20 آیتم
            .populate("user", "username")
            .populate("product", "name")
            .lean()
            .exec();

        // گرفتن تعداد کل آیتم‌ها برای محاسبه تعداد صفحات
        const total = await Orders.countDocuments();

        return {
            status: 'success',
            payload: {
                data: ordersData.map((data: any) => ({
                    id: data._id.toString(), // تبدیل _id به string
                    user: data.user.username,
                    product: data.product.name,
                    count: data.count,
                    price: data.price,
                    totalPrice: data.totalPrice,
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

export async function DeleteOrderAction(prevState: unknown, formData: FormData) {

    // ولیدیشن داده‌ها
    const subMission = parseWithZod(formData, {
        schema: productChangePublishStatueSchema(),
    });

    if (subMission.status !== 'success') {
        return subMission.reply();
    }

    const { id } = subMission.value;


    // اتصال به دیتابیس

    try {
        await dbConnect();
        // پاک کردن از دیتابیس
        const updatedProduct = await Orders.findByIdAndDelete(id).exec();
        // پاک کردن فرم
        revalidatePath(`/cmsContactUs`);
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

export async function getOrdersForOneUser(username: string) {
    console.log(username);

    try {
        await dbConnect();

        const UserExist = await checkUserNameExistAction(username);
        if (UserExist.status === "success") {
            return {
                status: 'error',
                payload: {
                    data: [],
                }
            } as const;
        }

        const userId = UserExist.data?.id;

        const ordersData = await Orders.find({ user: userId }, `_id user product count price totalPrice createdAt `)
            .sort({ createdAt: -1 }) // مرتب‌سازی نزولی بر اساس createdAt
            .populate("product", "name")
            .lean()
            .exec();

        return {
            status: 'success',
            payload: {
                data: ordersData.map((data: any) => ({
                    id: data._id.toString(), // تبدیل _id به string
                    productName: data.product.name,
                    count: data.count,
                    totalPrice: data.totalPrice,
                    createdAt: data.createdAt,
                })),

            },
        } as const;
    } catch (error) {
        console.error('', error);
        return {
            status: 'error',
            payload: {
                data: [],
            },
        } as const;
    }
}

