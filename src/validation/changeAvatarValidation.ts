
import { z } from 'zod';
import { changeAvatarValType } from '@/Type/validation/changeAvatarValType.type';

export const changeAvatarSchema = (translate: changeAvatarValType | null) => {
    return z.object({
        username: z
            .string(),
        avatar: z
            .instanceof(File, {
                message: translate?.valNewAvatar,
            })
            .refine((file) => file && file.size > 0, {
                message: translate?.valNewAvatar,
            })
            .refine((file) => file && file.size <= 1 * 1024 * 1024, {
                message: translate?.valAvatarTooLarge,
            })
            .refine(
                (file) => file && ['image/jpeg', 'image/png'].includes(file.type),
                {
                    message: translate?.valAvatarInvalidType,
                }
            ),

    })
};
