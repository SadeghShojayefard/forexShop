
import { z } from 'zod';

export const updateOrderSchema = () => {
    return z.object({
        id: z.string(),
        username: z
            .string({ required_error: "پر کردن فیلد نام کاربری اجباری است." })
            .min(2, { message: "فیلد نام کاربری حداقل باید دارای 2 کاراکتر باشد" })
            .max(20, { message: "فیلد نام کاربری حداکثر باید 20 کاراکتر داشته باشد." }),
        product: z
            .string({ required_error: "پر کردن فیلد نام محصول اجباری است." })
            .min(10, { message: "فیلد نام محصول حداقل باید دارای 10 کاراکتر باشد" })
            .max(100, { message: "فیلد نام محصول حداکثر باید 100 کاراکتر داشته باشد." }),
        count: z
            .number({
                coerce: true,
                required_error: 'پر کردن فیلد تعداد سفارش اجباری است.',
                message: "پر کردن فیلد تعداد سفارش اجباری است.",
            })
            .min(0, { message: "فیلد تعداد سفارش نمی تواند کمتر از صفر باشد" }),
    });
};
