
import { z } from 'zod';

export const offFormShema = () => {
    return z.object({
        offs: z
            .number({
                coerce: true,
                required_error: "انتخاب میزان تخفیف اجباری است",
                message: "انتخاب میزان تخفیف اجباری است",
            })
            .min(0, { message: "میزان تخفیف نمی تواند کمتر صفر باید" })
            .max(100, { message: "میزان تخفیف نمی تواند بیشتر از 100 باشد" }),
    });
};
