
import { z } from 'zod';

export const commentUpdateSchema = () => {
    return z.object({
        id: z.string(),
        text: z
            .string({ required_error: "پر کردن فیلد متن نظر اجباری است." })
            .min(5, { message: "متن نظر حداقل باید 5 کاراکتر باشد" })
            .max(1000, { message: "متن نظر حدکثر باید 1000 کاراکتر باشد" }),
    });
};
