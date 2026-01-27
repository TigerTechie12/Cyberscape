import express from 'express'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
const JWT_SECRET:any=process.env.JWT_SECRET
const app=express()
const port=3000
app.use("/api/v1",Router)
app.use(express.json())
app.use(cors())
app.listen(port, () => {
  
  console.log(`Server is running on port ${port}`); 
})


