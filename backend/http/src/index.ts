import express from 'express'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
const JWT_SECRET:any=process.env.JWT_SECRET
const app=express()
app.use("/api/v1",Router)
app.use(express.json())
app.use(
    function verifyToken(req,res,next){
const authHeader=req.headers.authorization
if(!authHeader || !authHeader.startsWith('Bearer ')){
return res.status(403).send("Unauthorized")    
}
const token:any=authHeader.split(" ")[1]
try{
   const decoded=jwt.verify(token,JWT_SECRET)
if(!decoded){
return    res.status(403).send("unable to verify")

}
(req as any).user=decoded
next()
}

catch(e){return res.json({message:"Something went wrong"})}
}
)
app.listen(process.env.port || 3000)


