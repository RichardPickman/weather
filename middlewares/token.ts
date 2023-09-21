import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface BodyRequest extends Request {
    user?: string | jwt.JwtPayload;
}

export default function (req: BodyRequest, res: Response, next: any) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers?.authorization?.split(" ")[1];

        if (token) {
            console.log("About to verify JWT token...");

            const decoded = jwt.verify(token, process.env.SECRET_KEY as string);

            console.log("Token verified successfully!!!");

            req.body.user = decoded;

            next();

            return;
        }

        next();
    } catch (e) {
        console.log("Token verification failed, responding with code 401");

        res.status(401).json({ message: "Not authorised" });
    }
}
