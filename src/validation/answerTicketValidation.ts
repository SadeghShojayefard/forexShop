
import { z } from 'zod';
import { newTicketValType } from '@/Type/validation/newTicketValType.type';

export const answerTicketSchema = (translate: newTicketValType | null) => {
    return z.object({
        text: z
            .string({ required_error: translate?.ticketTextRequir })
            .min(20, { message: translate?.ticketTextMin })
            .max(1000, { message: translate?.ticketTextMax }),
    });
};
