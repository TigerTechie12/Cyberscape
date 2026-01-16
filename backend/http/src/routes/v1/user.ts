import { userMetaData } from "common";
import { Router } from "express";
import {client} from '@repo/db/client'
import jwt,{type JwtPayload}  from "jsonwebtoken";
const router=Router()
const JWT_SECRET:any=process.env.JWT_SECRET
router.post('/metadata',async(req,res)=>{
    const body=req.body
    const parsedData:any=userMetaData.safeParse(body)
    if(!parsedData.success){
      return  res.status(400).json({message:"Wrong Inputs"})
    }
   
  
    try{  const authHeader=req.headers.authorization
    const token:any=authHeader?.split("")[1] 
        const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload
        const id:any=decoded.userId 
        const updateData=await client.user.update({where:{id:id},
            data:{
                avatarId:parsedData.data.avatarId
            }})
     return   res.status(200).json({Message:"Udpated metadata"})
    }

catch(e){
   return res.status(403).json({message:"Something went wrong"})
}
})
router.get('/avatars',async(req,res)=>{


try{
    const authHeader=req.headers.authorization
    const token:any=authHeader?.split("")[1]
    const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload
    const id:any=decoded.userId
const avatarId:any=await client.user.findMany({where:{id:id},
    select:{avatarId:true}
})

    const avatars=await client.avatar.findMany({
where:{id:avatarId.data.avatarId},
select:{id:true,
    name:true,
    imageUrl:true
}
    })
   return res.status(200).json({avatars})}
catch(e){res.status(403).json({message:"Something went wrong"})}

})

router.get('/metadata/bulk?ids=[]',(req,res)=>{
    //get info from db and return
    

return res.status(200).json({})
})

