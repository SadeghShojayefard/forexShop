export type CommentType = {
    id?: number;
    author: string;
    date: string;
    text: string;
    replies?: CommentType[];
};