'use server';
import { parseWithZod } from '@conform-to/zod';
import { ContactFormSchema } from '@/validation/ContactUsValidation';
import dbConnect from '@/lib/db';
import ContactUs from '@/lib/models/contactUs';
import { revalidatePath } from 'next/cache';
import { productChangePublishStatueSchema } from '@/validation/productChangePublishStatueValidation';

export async function contactUsFormAction(prevState: unknown, formData: FormData) {

    // ولیدیشن داده‌ها
    const subMission = parseWithZod(formData, {
        schema: ContactFormSchema(null),
    });

    if (subMission.status !== 'success') {
        return subMission.reply();
    }

    // اتصال به دیتابیس
    await dbConnect();

    try {
        // ذخیره داده‌ها در دیتابیس
        const { name, email, phone, message } = subMission.value;
        await ContactUs.create({
            name,
            email,
            phone,
            message,
            reviewState: false,
        });

        // به‌روزرسانی جدول بعد از ثبت فرم
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

export async function getContactUs(page: number = 1, limit: number = 20) {
    await dbConnect();

    try {
        // محاسبه تعداد آیتم‌هایی که باید رد بشن
        const skip = (page - 1) * limit;

        // گرفتن داده‌ها با مرتب‌سازی و صفحه‌بندی
        const contactUsData = await ContactUs.find({}, `name email phone message reviewState createdAt`)
            .sort({ createdAt: -1 }) // مرتب‌سازی نزولی بر اساس createdAt
            .skip(skip) // رد کردن آیتم‌های صفحات قبلی
            .limit(limit) // محدود کردن به 20 آیتم
            .lean()
            .exec();

        // گرفتن تعداد کل آیتم‌ها برای محاسبه تعداد صفحات
        const total = await ContactUs.countDocuments();

        return {
            status: 'success',
            payload: {
                data: contactUsData.map((data: any) => ({
                    id: data._id.toString(), // تبدیل _id به string
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    message: data.message,
                    reviewState: data.reviewState,
                    date: data.createdAt,
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
        console.error('خطا در دریافت داده‌های تماس:', error);
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


export async function changeReviewStateAction(id: string) {
    await dbConnect();
    const product = await ContactUs.findById(id).exec();

    const updatedProduct = await ContactUs.findByIdAndUpdate(
        id,
        { $set: { reviewState: true } },
        { new: true } // برگرداندن داکیومنت آپدیت‌شده
    ).exec();

    // Revalidate مسیر صفحه برای به‌روزرسانی جدول
    revalidatePath('/cmsProduct');
}

export async function DeleteMessageAction(prevState: unknown, formData: FormData) {

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
        const updatedProduct = await ContactUs.findByIdAndDelete(id).exec();
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