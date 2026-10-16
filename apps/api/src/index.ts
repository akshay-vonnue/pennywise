import express from "express";
import "dotenv/config";
import cors from 'cors';

import authRouter from "./modules/auth/auth.router";
import expenseRouter from "./modules/expense/expense.router";
import { ErrorHandler } from "./middleware/ErrorHandler";

export const app = express();

app.use(cors({
    origin:'*'
}))
app.use(express.json());

app.use("/auth", authRouter);
app.use("/expense", expenseRouter);

app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server running on port:`, process.env.PORT);
});
