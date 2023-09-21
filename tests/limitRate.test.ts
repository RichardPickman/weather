import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import dotenv from "dotenv";

dotenv.config();

describe("Limit rate Tests", () => {
    test("should be blocked for ", async () => {
        const loginData = { email: "admin@email.com", password: "admin" };
        const token = jwt.sign(loginData, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });
        const Authorization = "Bearer " + token;

        for (let i = 0; i < 6; i++) {
            await request(app).get("/weather/moscow").set({ Authorization });
        }

        await request(app)
            .get("/weather/cracow")
            .set({ Authorization })
            .expect(400)
            .then((res) => {
                expect(res.body).toMatchObject({
                    message: "Too many requests per 10 seconds session",
                });
            });
    });
});
