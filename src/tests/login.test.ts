import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import dotenv from "dotenv";

dotenv.config();

describe("Login Tests", () => {
    test("should pass login", async () => {
        const loginData = { email: "admin@email.com", password: "admin" };
        const token = jwt.sign(loginData, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });

        await request(app)
            .post("/login")
            .send(loginData)
            .expect(200)
            .then((res) => expect(res.body).toEqual(token));
    });

    test("should return error message on invalid login data", async () => {
        const loginData = { email: undefined, password: undefined };

        await request(app)
            .post("/login")
            .send(loginData)
            .expect(400)
            .then((res) => expect(res.body).toHaveProperty("message"));
    });
});
