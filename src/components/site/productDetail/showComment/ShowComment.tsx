// ShowComment.tsx
import { Button } from '@/components/ui/button';
import React from 'react';
import Image from 'next/image';
import { CommentType } from '@/Type/CommentType.type'; // مسیرت رو بر اساس پروژه تنظیم کن



interface ShowCommentProps {
    comment: CommentType;
}

export default function ShowComment({ comment, locale }: ShowCommentProps & { locale: string }) {
    return (
        <div className="flex flex-col justify-start items-center gap-1 border-2 border-cyan-600 rounded-2xl 
      w-full m-2 p-2 shadow-black shadow-2xl">
            <div className="flex flex-row w-full justify-start items-center gap-2 p-2">
                <Image
                    src="/logo.png"
                    width={50}
                    height={50}
                    alt="site-logo"
                    className="rounded-full border border-sky-800 bg-cyan-500"
                />
                <p>{comment.author} |</p>
                <p>{comment.date}</p>
            </div>
            <div className="flex flex-col justify-start items-center gap-2 w-full m-2 p-2">
                <div className="flex flex-row w-full justify-between items-center gap-2 p-2">
                    <p>{comment.text}</p>
                    <Button className="text-white bg-cyan-700 backdrop-blur-3xl border-2 border-sky-300  
              rounded-md shadow-md shadow-cyan-400 hover:bg-cyan-800/30">

                        {locale === "fa" ?
                            <span>پاسخ</span>
                            :
                            <span>Answer</span>
                        }
                    </Button>
                </div>

                {/* نمایش پاسخ‌ها */}
                {Array.isArray(comment.replies) && comment.replies.length > 0 && (
                    <div className="pl-8 w-full">
                        {comment.replies.map((reply) => (
                            <ShowComment key={reply.id} comment={reply} locale={locale} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
