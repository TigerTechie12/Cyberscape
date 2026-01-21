import express from 'express'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
const JWT_SECRET:any=process.env.JWT_SECRET 
 import type { Request,Response, NextFunction } from 'express'
export function userMiddleware(req:Request,res:Response,next:NextFunction){
const authHeader=req.headers.authorization
if(!authHeader || !authHeader.startsWith('Bearer')){
return res.status(403).send("Unauthorized")    
}
const token:any=authHeader.split(" ")[1]
try{
   const decoded=jwt.verify(token,JWT_SECRET) as {role:string, userId:string}
if(decoded.role !=='User'){
return    res.status(403).send("unable to verify")

}
(req as any).userId=decoded.userId
next()
}

catch(e){return res.json({message:"Something went wrong"})}
}