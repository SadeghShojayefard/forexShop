
import { z } from 'zod';
import { contactUsValType } from '@/Type/validation/contactUsValType.type';

export const ContactFormSchema = (translate: contactUsValType | null) => {
    return z.object({
        name: z
            .string({ required_error: translate?.valContactUsNameRequir })
            .min(2, { message: translate?.ValContactUsNameMin })
            .max(50, { message: translate?.ValContactUsNameMax }),
        email: z
            .string({ required_error: translate?.valContactUsEmailRequir })
            .email({ message: translate?.ValContactUsEmailNotValid }),
        phone: z
            .string({ required_error: translate?.valContactUsPhoneRequir })
            .min(11, { message: translate?.ValContactUsPhoneNotMin })
            .max(14, { message: translate?.ValContactUsPhoneNotMax }),
        message: z
            .string({ required_error: translate?.valContactUsMessageRequir })
            .min(10, { message: translate?.ValContactUsMessageMin })
            .max(1000, { message: translate?.ValContactUsMessageMax }),
    });
};
