
import { z } from 'zod';
import { commentValType } from '@/Type/validation/commentValType.type';

export const sendCommentSchema = (translate: commentValType | null) => {
    return z.object({
        username: z.string(),
        text: z
            .string({ required_error: translate?.commentTextRequir })
            .min(20, { message: translate?.commentTextMin })
            .max(1000, { message: translate?.commentTextMax }),
    });
};
