
import { z } from 'zod';
import { forgetPasswordValType } from '@/Type/validation/forgetPasswordValType.type';

export const forgetPasswordShema = (translate: forgetPasswordValType | null) => {
    return z.object({
        username: z
            .string({ required_error: translate?.valContactUsNameRequir })
            .min(2, { message: translate?.ValContactUsNameMin })
            .max(50, { message: translate?.ValContactUsNameMax }),
        email: z
            .string({ required_error: translate?.valContactUsEmailRequir })
            .email({ message: translate?.ValContactUsEmailNotValid }),
    });
};
