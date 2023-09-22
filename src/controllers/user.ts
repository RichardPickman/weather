import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const generateJWT = (email: string, password: string) =>
    jwt.sign({ email, password }, process.env.SECRET_KEY as string, {
        expiresIn: "24h",
    });

export const handleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: "'email' and 'password' must be provided",
            });

            return;
        }

        const response = generateJWT(email, password);

        res.status(200).json(response);
    } catch (error) {
        console.log("Error occured while getting an city weather");
        next();
    }
};