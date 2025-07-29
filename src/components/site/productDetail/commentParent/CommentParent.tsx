
import React from 'react';
import ShowComment from '../showComment/ShowComment';
import { CommentType } from '@/Type/CommentType.type';

interface CommentParent {
    comments: CommentType[];
}

export default function CommentParent({ comments, locale }: CommentParent & { locale: string }) {
    return (
        <div className="w-full flex flex-col gap-4 p-4">
            {comments.map((comment) => (
                <ShowComment key={comment.id} comment={comment} locale={locale} />
            ))}
        </div>
    );
}