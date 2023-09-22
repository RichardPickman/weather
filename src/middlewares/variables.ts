import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export default function checkVars() {
    const { WEATHER_KEY, SECRET_KEY, ACCESS_TOKEN, REFRESH_TOKEN, PORT } =
        process.env;

    if (!WEATHER_KEY)
        throw new Error(
            "There is no weather WEATHER_KEY provided by process.env"
        );
    if (!SECRET_KEY)
        throw new Error(
            "There is no weather ACCESS_TOKEN provided by process.env"
        );

    if (!ACCESS_TOKEN)
        throw new Error(
            "There is no weather REFRESH_TOKEN provided by process.env"
        );

    if (!REFRESH_TOKEN)
        throw new Error("There is no weather api key provided by process.env");

    if (!PORT)
        throw new Error("There is no weather api key provided by process.env");
}
