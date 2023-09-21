import e from "express";
import { handleLogin } from "../controllers/user";
import { handleWeather } from "../controllers/weather";
import handleRequests from "../middlewares/requests";
import JWTHandler from "../middlewares/token";

export const router = e();

router.get("/weather/:city", JWTHandler, handleRequests, handleWeather);

router.post("/login", handleLogin);
