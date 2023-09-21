import e from "express";
import cors from "cors";
import error from "./middlewares/error";
import { router } from "./router";

const app = e();

app.use(cors({ origin: "*" }));
app.use(e.json());
app.use(router);
app.use(error);

app.listen(5000, () => console.log("Listening of port: ", 5000));
