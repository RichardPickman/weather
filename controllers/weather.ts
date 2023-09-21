import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const { WEATHER_KEY } = process.env;

const getSupposedCity = async (city: string) => {
    const url = `http://api.weatherapi.com/v1/search.json?key=${WEATHER_KEY}&q=${city}`;

    const arr = await fetch(url).then((res) => res.json());

    return arr[0];
};

export const handleWeather = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { city } = req.params;
        const supposedCity = await getSupposedCity(decodeURI(city));

        if (!supposedCity) {
            return res.status(400).json({ message: "There is no city found!" });
        }

        const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_KEY}&q=${supposedCity.name}`;
        const response = await fetch(weatherUrl).then((res) => res.json());

        res.status(200).json(response);
    } catch (error) {
        console.log("Error occured while getting an city weather: ", error);
        next();
    }
};
