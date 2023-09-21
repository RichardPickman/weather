import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import dotenv from "dotenv";

dotenv.config();

describe("JWT Tests", () => {
    test("should return error message on weather API endpoint without JWT", async () => {
        await request(app)
            .get(encodeURI("/weather/saint petersburg"))
            .expect(403)
            .then((res) => {
                expect(res.body).toMatchObject({ message: "Not authorised" });
            });
    });

    test("should return 403 on incorrect JWT Token", async () => {
        const loginData = { email: "admin@email.com", password: "admin" };
        const token = jwt.sign(loginData, process.env.SECRET_KEY, {
            expiresIn: "24h",
        });
        const Authorization = "Bearer " + ["b", token.slice(1)].join("");

        await request(app)
            .get("/weather/cracow")
            .set({ Authorization })
            .expect(403)
            .then((res) => {
                expect(res.body).toHaveProperty("message");
            });
    });
});
