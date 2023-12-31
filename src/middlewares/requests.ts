import { Request, Response } from "express";

const userToRequestLimitMap = new Map<
    string,
    { count: number; date: number }
>();

const MAX_REQUEST_COUNT = 5;
const RATE_LIMIT_TIMEOUT = 10000;

export default function (req: Request, res: Response, next: any) {
    try {
        const { email } = req.body.user;

        const { count, date } = userToRequestLimitMap.get(email) ?? {
            count: 0,
            date: null,
        };

        const isTimeLimit = date
            ? Date.now() - date < RATE_LIMIT_TIMEOUT
            : false;
        const isRateLimit = count >= MAX_REQUEST_COUNT;

        if (isTimeLimit && isRateLimit) {
            return res.status(400).json({
                message: `Too many requests per ${
                    RATE_LIMIT_TIMEOUT / 1000
                } seconds session`,
            });
        }

        userToRequestLimitMap.set(email, {
            date: Date.now(),
            count: isRateLimit ? 1 : count + 1,
        });

        next();
    } catch (error) {
        res.status(500).json({
            message: "Requests handler encountered an error",
        });
    }
}
