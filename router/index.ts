import e from "express";
import { handleWeather } from "../controllers/weather";
import { handleLogin } from "../controllers/user";
import handleRequests from "../middlewares/requests";
import JWTHandler from "../middlewares/token";

export const router = e();

router.get("/weather/:city", JWTHandler, handleRequests, handleWeather);

router.post("/login", handleLogin);
