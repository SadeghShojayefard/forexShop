
import { z } from 'zod';


export const productChangePublishStatueSchema = () => {
    return z.object({
        id: z
            .string()
    })
};
