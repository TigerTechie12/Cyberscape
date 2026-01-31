import { userMetaData } from "common";
import { Router } from "express";
import {client} from '@repo/db/client'
import jwt,{type JwtPayload}  from "jsonwebtoken";
const router=Router()

router.post('/metadata',async(req,res)=>{
    const body=req.body
    const parsedData:any=userMetaData.safeParse(body)
    if(!parsedData.success){
      return  res.status(400).json({message:"Wrong Inputs"})
    }

    try{
        const JWT_SECRET:any=process.env.JWT_SECRET
        const authHeader=req.headers.authorization
        const token:any=authHeader?.split(" ")[1]
        const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload
        const id:any=decoded.userId
        const updateData=await client.user.update({where:{id:id},
            data:{
                avatarId:parsedData.data.avatarId
            }})
     return   res.status(200).json({Message:"Updated metadata"})
    }
catch(e){
   return res.status(403).json({message:"Something went wrong"})
}
})

router.get('/avatars',async(req,res)=>{
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
        imageUrl:m.avatar?.imageUrl ?? null
    }))
})}
  catch(e){return res.status(403).json({message:"Something went wrong"})}
})

export default router
