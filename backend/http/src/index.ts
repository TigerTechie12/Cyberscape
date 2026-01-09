import express from 'express'
import { Router } from 'express'
const app=express()
app.use("/api/v1",Router)
app.use(express.json())
app.use()
app.listen(process.env.port || 3000)


