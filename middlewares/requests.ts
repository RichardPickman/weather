import { Request, Response } from "express";

const userToRequestLimitMap = new Map<
    string,
    { count: number; date: number }
>();

const MAX_REQUEST_COUNT = 5;
const RATE_LIMIT_TIMEOUT = 10000;
const DEFAULT_STATE = {
    count: 0,
    date: Date.now(),
};

export default function (req: Request, res: Response, next: any) {
    try {
        const { email } = req.body.user;

        // GET INTIAL STATE OR EXISTED
        const state = userToRequestLimitMap.get(email) ?? DEFAULT_STATE;

        // CHECK IF COUNT IS HIGHER THEN RATE LIMIT WITH ERROR RESPONSE
        if (state.count >= MAX_REQUEST_COUNT) {
            return res.status(400).json({
                message: "Too many requests per 2 minute session",
            });
        }

        // OTHERWISE UPDATE STATE
        userToRequestLimitMap.set(email, {
            ...state,
            count: state.count + 1,
        });

        // TIMEOUT TO REMOVE OBJECT
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
