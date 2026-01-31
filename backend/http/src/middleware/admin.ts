import jwt from 'jsonwebtoken'
import type { Request,Response, NextFunction } from 'express'

export function adminMiddleware(req:Request,res:Response,next:NextFunction){
    const JWT_SECRET:any=process.env.JWT_SECRET
    const header=req.headers.authorization
    if(!header || !header.startsWith('Bearer')){
        return res.status(403).json({message:"Invalid"})
    }
   const token=header.split(" ")[1] 
   if(!token){
    return res.status(403).json({message:"Token not present"})
   }
   try{
    const decode=jwt.verify(token,JWT_SECRET) as {username:string,type:string}
   if(decode.type !=='Admin'){
    return res.status(403).json({message:"Invalid Token"})
   }
   (req as any).adminId=decode.username
   next()
}
   catch(e){
        return res.status(403).json({message:"Something went wrong"})
   }
 }