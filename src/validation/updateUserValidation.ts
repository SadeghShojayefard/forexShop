
import { z } from 'zod';

export const updateUserShema = () => {
    return z.object({
        username: z
            .string({ required_error: "فیلد نام کاربری باید پر شود" })
            .min(5, { message: "فیلد نام کاربری حداقل باید 5 کاراکتر باشد." })
            .max(20, { message: "فیلد نام کاربری حداکثر باید 20 کاراکتر باشد." }),
        email: z
            .string({ required_error: "پر کردن ایمیل الزامی است." })
            .email({ message: "ایمیل نامعتبر است." }),
        password: z
            .string()
            .min(8, { message: "فیلد تکرار رمز عبور حداقل باید 8 کاراکتر باشد." })
            .max(20, { message: "فیلد تکرار رمز عبور حداکثر باید 20 کاراکتر باشد." })
            .optional(),
        name: z
            .string({ required_error: "پر کردن نام الزامی است." })
            .min(5, { message: "فیلد نام حداقل باید 5 کاراکتر باشد." })
            .max(100, { message: "فیلد نام حداکثر باید 100 کاراکتر باشد." })
            .optional(),
        avatar: z.string({ required_error: "انتخاب نام آواتار الزامی است." })
            .optional(),
        role: z.string({ required_error: "انتخاب نقش الزامی است." }),
        id: z.string(),
    })
};
