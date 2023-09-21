import e from "express";
import { handleLogin } from "../controllers/user";
import { handleWeather } from "../controllers/weather";
import requestLimit from "../middlewares/requests";
import jwtToken from "../middlewares/token";

export const router = e();

router.get("/weather/:city", jwtToken, requestLimit, handleWeather);

router.post("/login", handleLogin);
