import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './routes/v1/index.js'
import adminRouter from './routes/v1/admin.js'
import userRouter from './routes/v1/user.js'
import spaceRouter from './routes/v1/space.js'

const app=express()
const port=3000

// Middleware MUST come BEFORE routes
app.use(cors())
app.use(express.json())

app.use("/api/v1", router)
app.use("/api/v1", adminRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1", spaceRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


