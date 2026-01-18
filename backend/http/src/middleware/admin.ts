import express from 'express'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
const JWT_SECRET:any=process.env.JWT_SECRET 
 import type { Request,Response, NextFunction } from 'express'
 export function adminMiddleware(req:Request,res:Response,next:NextFunction){
    const header=req.headers.authorization
    if(!header || !header.startsWith('Bearer')){
        return res.status(403).json({message:"Invalid"})
    }
   const token=header.split(" ")[1] 
   if(!token){
    return res.status(403).json({message:"Token not present"})
   }
   try{
    const decode=jwt.verify(token,JWT_SECRET) as {role:String,adminId:String}
   if(decode.role !=='Admin'){
    return res.status(403).json({message:"Invalid Token"})
   }
   (req as any).adminId=decode.adminId
}
   catch(e){
        return res.status(403).json({message:"Something went wrong"})
   }
 }