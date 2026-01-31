import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './routes/v1/index.js'
import adminRouter from './routes/v1/admin.js'

const app=express()
const port=3000

// Middleware MUST come BEFORE routes
app.use(cors())
app.use(express.json())

// Use the actual router, not the Router class
app.use("/api/v1", router)
app.use("/api/v1", adminRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


