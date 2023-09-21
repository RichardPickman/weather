import { Request, Response } from "express";

const userToRequestLimitMap = new Map<string, number>();

const MAX_REQUEST_COUNT = 5;
const RATE_LIMIT_TIMEOUT = 120000;
const DEFAULT_STATE = 0;

export default function (req: Request, res: Response, next: any) {
    try {
        const { email } = req.body.user;

        const state = userToRequestLimitMap.get(email) ?? DEFAULT_STATE;

        if (state >= MAX_REQUEST_COUNT) {
            return res.status(400).json({
                message: "Too many requests per 2 minute session",
            });
        }

        userToRequestLimitMap.set(email, state + 1);

        setTimeout(() => {
            userToRequestLimitMap.delete(email);
        }, RATE_LIMIT_TIMEOUT);

        next();
    } catch (error) {
        res.status(500).json({
            message: "Requests handler encountered an error",
        });
    }
}
