
import { z } from 'zod';
import Products from "@/lib/models/products";
import dbConnect from '@/lib/db';

export const productCreateSchema = () => {
    return z.object({
        name: z
            .string({ required_error: "پر کردن نام محصول اجباری است" })
            .min(5, { message: "نام محصول نباید کمتر از 5 حرف باشد" })
            .max(200, { message: "نام محصول نباید بیشتر از 200 کاراکتر باشد" }),
        shortName: z
            .string({ required_error: "پر کردن نام کوتاه محصول اجباری است" })
            .min(5, { message: "نام کوتاه محصول نباید کمتر از 5 حرف باشد" })
            .max(200, { message: "نام کوتاه محصول نباید بیشتر از 200 کاراکتر باشد" }),
        mainImage: z
            .instanceof(File, {
                message: "تصویر شاخص باید انتخاب شود",
            })
            .refine((file) => file && file.size > 0, {
                message: "تصویر شاخص باید انتخاب شود",
            })
            .refine((file) => file && file.size <= 1 * 1024 * 1024, {
                message: "حجم تصویر شاخص نباید بیشتر از یک مگابایت باشد",
            })
            .refine(
                (file) => file && ['image/jpeg', 'image/png'].includes(file.type),
                {
                    message: "تنها دو فرمت jpeg و png مجاز هستند.",
                }
            ),
        slideImage: z
            .array(
                z
                    .instanceof(File, {
                        message: 'تصاویر اسلاید باید انتخاب شوند',
                    })
                    .refine((file) => file && file.size > 0, {
                        message: 'هر تصویر اسلاید باید دارای حجم باشد',
                    })
                    .refine(
                        (file) => file && ['image/jpeg', 'image/png'].includes(file.type),
                        {
                            message: 'تنها دو فرمت jpeg و png مجاز هستند',
                        }
                    )
            )
            .min(1, { message: 'حداقل یک تصویر اسلاید باید انتخاب شود' })
            .refine(
                (files) => files.reduce((total, file) => total + file.size, 0) <= 10 * 1024 * 1024,
                {
                    message: 'مجموع حجم تصاویر اسلاید نباید بیشتر از 10 مگابایت باشد',
                }
            ),

        metaTags: z
            .string({ required_error: "پر کردن کلمات کلیدی اجباری است" }),
        score: z
            .number({
                coerce: true,
                required_error: 'پر کردن فیلد امتیاز اجباری است.',
                message: "پر کردن فیلد امتیاز اجباری است.",
            })
            .min(0, { message: "فیلد امتیاز نمی تواند کمتر از صفر باشد" })
            .max(5, { message: "فیلد امتیاز نمی تواند بیشتر از 5 باشد" }),
        userNumber: z
            .number({
                coerce: true,
                required_error: 'پر کردن فیلد تعداد کاربران اجباری است.',
                message: "پر کردن فیلد تعداد کاربران اجباری است.",
            })
            .min(0, { message: "فیلد تعداد کاربران نمی تواند کمتر از صفر باشد" }),
        initPriceToman: z
            .number({
                coerce: true,
                required_error: 'پر کردن فیلد قیمت به تومان اجباری است.',
                message: "پر کردن فیلد قیمت به تومان اجباری است.",
            })
            .min(0, { message: "فیلد قیمت به تومان نمی تواند کمتر از صفر باشد" }),
        initPriceTether: z
            .number({
                coerce: true,
                required_error: 'پر کردن فیلد قیمت به تتر اجباری است.',
                message: "پر کردن فیلد قیمت به تتر اجباری است.",
            })
            .min(0, { message: "فیلد قیمت به تتر نمی تواند کمتر از صفر باشد" }),
        discount: z
            .number({
                coerce: true,
                required_error: 'پر کردن فیلد تخفیف اجباری است.',
                message: "پر کردن فیلد تخفیف اجباری است.",
            })
            .min(0, { message: "فیلد تخفیف نمی تواند کمتر از صفر باشد" }),
        finalPriceToman: z
            .number({
                coerce: true,
                required_error: 'پر کردن فیلد قیمت نهایی به تومان اجباری است.',
                message: 'پر کردن فیلد قیمت نهایی به تومان اجباری است.',
            }),
        finalPriceTether: z
            .number({
                coerce: true,
                required_error: 'پر کردن فیلد قیمت نهایی به تتر اجباری است.',
                message: 'پر کردن فیلد قیمت نهایی به تتر اجباری است.',
            }),
        indicatorFile: z
            .instanceof(File, {
                message: "فایل اندیکاتور باید انتخاب شود",
            })
            .refine((file) => file && file.size > 0, {
                message: "فایل اندیکاتور باید انتخاب شود",
            })
            .refine(
                (file) => file && file.name.toLowerCase().endsWith('.rar'),
                {
                    message: 'فایل باید به صورت RAR باشد.',
                }
            ),
        textFA: z
            .string({ required_error: "پر کردن توضیحات فارسی محصول اجباری است" })
            .min(100, { message: "توضیحات فارسی نباید کمتر از 100 حرف باشد" }),
        textEn: z
            .string({ required_error: "پر کردن توضیحات انگلیسی اجباری است" })
            .min(100, { message: "توضیحات انگلیسی نباید کمتر از 100 حرف باشد" }),
        publishState: z
            .string(),
    })
};
