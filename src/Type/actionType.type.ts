import { SubmissionResult } from "@conform-to/react";

export type ActionResult =
    | SubmissionResult<string[]>
    | {
        status: "success" | "error";
        payload?: {
            message?: string;
        };
    }
    | undefined; 