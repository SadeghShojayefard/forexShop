'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { CommentFormTranslationType } from '@/Type/CommentFormTranslationType.type';
import { commentValType } from '@/Type/validation/commentValType.type';
import { useCustomForm } from '@/hooks/useCustomForm';
import { sendCommentAction } from '@/helper/sendCommentAction';
import { sendCommentSchema } from '@/validation/sendCommentValidation';
export default function CommentSection({ translate, locale, valTranslate }
    :
    { translate: CommentFormTranslationType; locale: string, valTranslate: commentValType }) {

    const { form, fields, formAction, isPending, toastVisible } = useCustomForm({
        action: sendCommentAction,
        schema: sendCommentSchema(valTranslate), // تابع اسکیما
        showToast: true,
    });

    return (
        <div className="w-full flex text-dark p-5 rounded-2xl   justify-center items-center my-5 shadow-2xl shadow-black  ">

            <div className='flex flex-col w-full justify-start gap-1 items-start p-2'>
                {toastVisible && (
                    <div className="flex flex-row justify-center items-center w-full">
                        <p className=' p-2 bg-cyan-500/20 rounded-2xl shadow shadow-black w-fit'> {valTranslate.commentSuccefull}</p>
                    </div>
                )}
                <b>{translate.commentTitle}</b>
                <p>{translate.commentSignInError}</p>
                {/* comment Form in detail product */}
                <form className="form-group w-full" id={form.id} onSubmit={form.onSubmit} action={formAction}>

                    <div className="input-group">
                        <label className='text-red-500'>{translate.commentStar}</label>
                        <input id='username' defaultValue={"username"} type='hidden'
                            key={fields.username.key}
                            name={fields.username.name} />
                        <textarea id='text'
                            className='w-full  border-2 border-black  rounded-md p-3 focus:border-sky-800 outline-0 h-56' rows={5}
                            key={fields.text.key}
                            name={fields.text.name}
                        >


                        </textarea>
                        {fields.text.errors &&
                            <p className=' mb-5 text-md bg-red-300/50 backdrop-blur-2xl  mt-5 p-1 inline-block rounded-2xl'>{fields.text.errors}</p>
                        }
                    </div>
                    <Button className="text-white bg-cyan-500/30 backdrop-blur-3xl border-2 border-sky-300  rounded-md shadow-md shadow-cyan-400 hover:bg-cyan-800/30"
                        disabled={isPending}

                    >

                        {isPending ? (locale === 'fa' ? 'در حال ارسال...' : 'sending...') : translate.sendComment}

                    </Button>
                </form>
            </div>
        </div>
    )
}
