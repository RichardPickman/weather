import e from "express";
import cors from "cors";
import error from "./middlewares/error";
import checkVars from "./middlewares/variables";
import { router } from "./router";

checkVars();

const app = e();

app.use(cors({ origin: "*" }));
app.use(e.json());
app.use(router);
app.use(error);

export default app;
