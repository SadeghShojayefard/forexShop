
import { z } from 'zod';
import { signUpValType } from '@/Type/validation/signUpValType.type';

export const signUpSchema = (translate: signUpValType | null) => {
    return z.object({
        username: z
            .string({ required_error: translate?.valSignInUserNameRequir })
            .min(2, { message: translate?.ValSignInUserNameMin })
            .max(50, { message: translate?.ValSignInUserNameMax }),
        email: z
            .string({ required_error: translate?.valContactUsEmailRequir })
            .email({ message: translate?.ValContactUsEmailNotValid }),
        password: z
            .string({ required_error: translate?.valSignInPasswordRequir })
            .min(8, { message: translate?.ValSignInConfirmPasswordMin })
            .max(20, { message: translate?.ValSignInConfirmPasswordMax }),
        password2: z
            .string({ required_error: translate?.valSignInConfirmPasswordRequir })
            .min(8, { message: translate?.ValSignInConfirmPasswordMin })
            .max(20, { message: translate?.ValSignInPasswordMax }),
        locale: z
            .string()
    }).refine((data) => data.password === data.password2, {
        message: translate?.ValSignInConfirmPasswordNotMatch,
        path: ['password2'],
    });;
};
