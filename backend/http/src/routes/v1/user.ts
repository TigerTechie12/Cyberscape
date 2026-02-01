import { userMetaData } from "common";
import { Router } from "express";
import {client} from '@repo/db/client'
import jwt,{type JwtPayload}  from "jsonwebtoken";
const router=Router()

router.post('/metadata',async(req,res)=>{
    console.log(">>> HIT /metadata route in userRouter")
    const body=req.body
    const parsedData:any=userMetaData.safeParse(body)
    if(!parsedData.success){
      return  res.status(400).json({message:"Wrong Inputs"})
    }

    const JWT_SECRET:any=process.env.JWT_SECRET
    const authHeader=req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"No token provided"})
    }
    const token=authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"Token missing"})
    }

    try{
        const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload
        const id=decoded.userId
        if(!id){
            return res.status(401).json({message:"Invalid token: no userId"})
        }
        await client.user.update({where:{id:id},
            data:{
                avatarId:parsedData.data.avatarId
            }})
     return   res.status(200).json({Message:"Updated metadata"})
    }
catch(e:any){
   console.log("POST /metadata error:", e?.message || e)
   if(e?.name === 'JsonWebTokenError' || e?.name === 'TokenExpiredError'){
       return res.status(401).json({message:"Invalid or expired token"})
   }
   return res.status(403).json({message: e?.message || "Something went wrong"})
}
})

router.get('/user/avatar',async(req,res)=>{
try{
    const JWT_SECRET:any=process.env.JWT_SECRET
    const authHeader=req.headers.authorization
    const token:any=authHeader?.split(" ")[1]
    const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload
    const id:any=decoded.userId
    const user=await client.user.findUnique({where:{id:id},
        select:{avatarId:true}
    })

    if(!user || !user.avatarId){
        return res.status(200).json({avatars:[]})
    }

    const avatar=await client.avatar.findUnique({
        where:{id:user.avatarId},
        select:{id:true, name:true, imageUrl:true}
    })

    return res.status(200).json({avatars: avatar ? [avatar] : []})
}
catch(e){return res.status(403).json({message:"Something went wrong"})}
})

router.get('/metadata/bulk',async(req,res)=>{
const userIdString= (req.query.ids ?? "[]") as string
    const userIds=(userIdString).slice(1,userIdString?.length-1).split(",")
    try{  const metaData=await client.user.findMany({
        where:{
            id:{
                in:userIds
            }
        },
        select:{
            id:true,
            avatar:true
        }
    })

return res.status(200).json({
    avatars:metaData.map((m)=>({
        userId:m.id,
        imageUrl:m.avatar?.imageUrl ?? null,
        name:m.avatar?.name ?? null
    }))
})}
  catch(e){return res.status(403).json({message:"Something went wrong"})}
})

export default router
