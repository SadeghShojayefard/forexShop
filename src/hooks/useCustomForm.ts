"use client"

// File: src/hooks/useCustomForm.ts
import { useActionState, useEffect, useState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import type { ActionResult } from '@/Type/actionType.type';
import type { ActionResult as ActionResult2 } from 'next/dist/server/app-render/types';

import type { ZodSchema } from 'zod';

interface UseCustomFormProps {
    action: (prevState: unknown, formData: FormData) => Promise<ActionResult | ActionResult2>;
    schema: ZodSchema; // فقط اسکیمای خام
    showToast?: boolean;
    id?: string;
}

export function useCustomForm({
    action,
    schema,
    showToast = false,
    id = 'form',
}: UseCustomFormProps) {
    const [lastResult, formAction, isPending] = useActionState<ActionResult | ActionResult2, FormData>(action, undefined);
    const [form, fields] = useForm({
        id,
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

    const [toastVisible, setToastVisible] = useState(false);

    useEffect(() => {
        if (showToast && lastResult?.status === 'success') {
            setToastVisible(true);
            const timer = setTimeout(() => setToastVisible(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [lastResult, showToast]);

    return { form, fields, lastResult, formAction, isPending, toastVisible, setToastVisible };
}


// const [lastResult, action] = useActionState<ActionResult, FormData>(SignInFormAction, undefined);
// const [form, fields] = useForm({
//     lastResult,
//     onValidate({ formData }) {
//         return parseWithZod(formData, { schema: SignInSchema(signInValTranslations) })
//     },
//     shouldValidate: 'onBlur',
//     shouldRevalidate: 'onInput',
// })