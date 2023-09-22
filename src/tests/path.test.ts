import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import dotenv from "dotenv";

dotenv.config();

describe("Weather Tests", () => {
    test("should return location and current data", async () => {
        const loginData = { email: "admin@email.com", password: "admin" };
        const token = jwt.sign(loginData, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });
        const Authorization = "Bearer " + token;

        await request(app)
            .get("/weather/cracow")
            .set({ Authorization })
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty("location");
                expect(res.body).toHaveProperty("current");
            });
    });

    test("should return error message on random string", async () => {
        const loginData = { email: "admin@email.com", password: "admin" };
        const token = jwt.sign(loginData, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });
        const Authorization = "Bearer " + token;

        await request(app)
            .get("/weather/89hv384hf09384")
            .set({ Authorization })
            .expect(400)
            .then((res) => {
                expect(res.body).toMatchObject({
                    message: "There is no city found!",
                });
            });
    });
});
