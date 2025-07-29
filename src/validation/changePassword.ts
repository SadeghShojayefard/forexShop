
import { z } from 'zod';
import { changePasswordValType } from '@/Type/validation/changePasswordValType.type';

export const changePasswordSchema = (translate: changePasswordValType | null) => {
    return z.object({
        username: z
            .string({ required_error: translate?.valSignInUserNameRequir })
            .min(2, { message: translate?.ValSignInUserNameMin })
            .max(50, { message: translate?.ValSignInUserNameMax }),
        currentPassword: z
            .string({ required_error: translate?.valCurrentPassworRequir })
            .min(8, { message: translate?.ValCurrentPassworMin })
            .max(20, { message: translate?.ValCurrentPassworMax }),
        newPassword: z
            .string({ required_error: translate?.valSignInPasswordRequir })
            .min(8, { message: translate?.ValSignInConfirmPasswordMin })
            .max(20, { message: translate?.ValSignInConfirmPasswordMax }),
        newPassword2: z
            .string({ required_error: translate?.valSignInConfirmPasswordRequir })
            .min(8, { message: translate?.ValSignInConfirmPasswordMin })
            .max(20, { message: translate?.ValSignInPasswordMax }),
    }).refine((data) => data.newPassword === data.newPassword2, {
        message: translate?.ValSignInConfirmPasswordNotMatch,
        path: ['newPassword2'],
    });
};
