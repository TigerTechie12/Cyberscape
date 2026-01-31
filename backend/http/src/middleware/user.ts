import jwt from 'jsonwebtoken'
import type { Request,Response, NextFunction } from 'express'

export function userMiddleware(req:Request,res:Response,next:NextFunction){
const JWT_SECRET:any=process.env.JWT_SECRET
const authHeader=req.headers.authorization
if(!authHeader || !authHeader.startsWith('Bearer')){
return res.status(403).json({message:"Unauthorized"})
}
const token:any=authHeader.split(" ")[1]
if(!token){
return res.status(403).json({message:"Token not present"})
}
try{
   const decoded=jwt.verify(token,JWT_SECRET) as {type:string, userId:string}
if(decoded.type !=='User'){
return    res.status(403).json({message:"Unable to verify"})
}
(req as any).userId=decoded.userId
next()
}
catch(e){return res.status(403).json({message:"Something went wrong"})}
}