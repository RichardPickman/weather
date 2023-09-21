import { Request, Response } from "express";

const state = new Map<string, number>();

export default function (req: Request, res: Response, next: any) {
    try {
        const { email } = req.body.user;
        const isUserExist = state.has(email);

        if (state.get(email) >= 5) {
            console.log(
                "The number of requests has exceeded the limit, rejecting"
            );

            res.status(400).json({
                message: "Too many requests per 2 minute session",
            });

            return;
        }

        if (isUserExist) {
            console.log("User exist, updating value");

            const currentAmount = state.get(email);

            state.set(email, currentAmount + 1);

            next();

            return;
        }

        if (!isUserExist) {
            console.log("User does not exist, creating value");

            state.set(email, 1);

            setTimeout(() => {
                console.log("Session ended, removing from cache");
                state.delete(email);
            }, 120000);

            next();

            return;
        }
    } catch (e) {
        console.log(e.message);

        res.status(500).json({
            message: "Requests handler encountered an error",
        });
    }
}
