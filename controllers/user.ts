import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const generateJWT = (email: number, password: string) =>
    jwt.sign({ email, password }, process.env.SECRET_KEY as string, {
        expiresIn: "24h",
    });

export const handleLogin = async (req: Request, res: Response) => {
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
        res.status(500).json({ message: error.message });
    }
};
