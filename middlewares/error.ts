import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
    try {
        res.status(500).json({ message: "some bad things happend..." });
    } catch (e) {
        throw new Error("Some baad error occured 0_0");
    }
}
