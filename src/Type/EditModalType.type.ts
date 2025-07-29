// import { ZodSchema } from "zod";
// import { ActionResult } from "./actionType.type";

// export type EditModalType = {
//     title: string;
//     text: string;
//     buttonText: string;
//     isUpdate: () => void;
//     children: React.ReactNode;
//     action: (prevState: unknown, formData: FormData) => Promise<ActionResult>; // اکشن فرم
//     schema: ZodSchema;
// };
import { ZodSchema } from 'zod';
import { ActionResult } from '@/Type/actionType.type';
import { ReactNode } from 'react';

export interface Field {
    name: string;
    key: string | undefined;
    errors?: string[];
}

export interface FormFields {
    [key: string]: Field;
}

export interface EditModalType {
    title: string;
    text: string;
    buttonText: string;
    isUpdate: () => void;
    children: (fields: FormFields) => ReactNode;
    action: (prevState: unknown, formData: FormData) => Promise<ActionResult>;
    schema: ZodSchema;
}