// export type ModalInputType = {
//     placeholder: string;
//     id: string;
//     value: string;
//     inputType: string;
//     onUpdateInputs: (id: string, value: string) => void;

// };

import { FormFields } from '@/Type/EditModalType.type'; // نوع FormFields رو وارد می‌کنیم

export interface ModalInputType {
    placeholder: string;
    id: string;
    value: string;
    inputType: 'text' | 'number' | 'textarea' | 'hidden' | 'email' | 'password';
    onUpdateInputs: (id: string, value: string) => void;
    fieldKey: string; // کلید فیلد (مثل "username")
    fields: FormFields; // نوع جدید
}