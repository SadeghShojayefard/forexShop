
import { z } from 'zod';
import { signInValType } from '@/Type/validation/signInValType.type';

export const SignInSchema = (translate: signInValType | null) => {
    return z.object({
        userName: z
            .string({ required_error: translate?.valSignInUserNameRequir })
            .min(5, { message: translate?.ValSignInUserNameMin })
            .max(20, { message: translate?.ValSignInUserNameMax }),
        password: z
            .string({ required_error: translate?.valSignInPasswordRequir })
            .min(5, { message: translate?.ValSignInPasswordMin })
            .max(20, { message: translate?.ValSignInPasswordMax }),
        locale: z.string(),
    });
};
