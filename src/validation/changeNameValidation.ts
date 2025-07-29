
import { z } from 'zod';
import { changeNameValType } from '@/Type/validation/changeNameValType.type';

export const changeNameSchema = (translate: changeNameValType | null) => {
    return z.object({
        username: z
            .string(),
        name: z
            .string({ required_error: "فیلد نام کاربری باید پر شود" })
            .min(5, { message: "فیلد نام کاربری حداقل باید 5 کاراکتر باشد." })
            .max(20, { message: "فیلد نام کاربری حداکثر باید 20 کاراکتر باشد." }),

    })
};

