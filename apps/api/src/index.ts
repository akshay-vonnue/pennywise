import express from 'express'
import 'dotenv/config'

import authRouter from './modules/auth/auth.router'
import { ErrorHandler } from './middleware/ErrorHandler'

export const app = express()

app.use(express.json())

app.use("/auth", authRouter)

app.use(ErrorHandler)

app.listen(process.env.PORT, () => {
    console.log(`server running on port:`,process.env.PORT)
})