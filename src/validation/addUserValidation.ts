
import { z } from 'zod';

export const addUserShema = () => {
    return z.object({
        username: z
            .string({ required_error: "فیلد نام کاربری باید پر شود" })
            .min(5, { message: "فیلد نام کاربری حداقل باید 5 کاراکتر باشد." })
            .max(20, { message: "فیلد نام کاربری حداکثر باید 20 کاراکتر باشد." }),
        email: z
            .string({ required_error: "پر کردن ایمیل الزامی است." })
            .email({ message: "ایمیل نامعتبر است." }),
        password: z
            .string({ required_error: "پر کردن رمز عبور الزامی است." })
            .min(8, { message: "فیلد تکرار رمز عبور حداقل باید 8 کاراکتر باشد." })
            .max(20, { message: "فیلد تکرار رمز عبور حداکثر باید 20 کاراکتر باشد." }),
    })
};
