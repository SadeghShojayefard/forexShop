
import { z } from 'zod';
import { newTicketValType } from '@/Type/validation/newTicketValType.type';

export const newTicketSchema = (translate: newTicketValType | null) => {
    return z.object({
        title: z
            .string({ required_error: translate?.ticketTextRequir })
            .min(5, { message: translate?.ticketTitleMin })
            .max(100, { message: translate?.ticketTitleMax }),

        text: z
            .string({ required_error: translate?.ticketTextRequir })
            .min(20, { message: translate?.ticketTextMin })
            .max(1000, { message: translate?.ticketTextMax }),
    });
};
