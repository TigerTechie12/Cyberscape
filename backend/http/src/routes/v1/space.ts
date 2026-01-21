import { Router } from "express";
import {spaceData} from "common"
import {client} from '@repo/db/client'
import { spaceElements } from "common";
const router=Router()
import { userMiddleware } from "src/middleware/user.js";
import jwt,{type JwtPayload}  from "jsonwebtoken";
const JWT_SECRET:any=process.env.JWT_SECRET
router.use(userMiddleware)
router.post('/space',async(req,res)=>{
const body=req.body
const parsedSpaceData:any=spaceData.safeParse(body)
if(!parsedSpaceData.success){
 return   res.status(400).json({message:"Invalid Inputs"})
}
try{
    if(!parsedSpaceData.data.mapId){
    const dbDataCreation=await client.space.create({data:{
        name:parsedSpaceData.data.name,
    thumbnail:parsedSpaceData.data.thumbnail,
    creatorId:req.userId!,
    width:parseInt(parsedSpaceData.data.dimensions.split("x")[0]),
    height:parseInt(parsedSpaceData.data.dimensions.split("x")[1])
    }
    })
    const spaceId=dbDataCreation.id
   return  res.status(200).json({spaceId})}

   const map=await client.maps.findFirst({
    where:{id:parsedSpaceData.data.mapId},select:{
        mapElements:true,
        width:true,
        height:true
    }
   })
       if (!map) {
        res.status(400).json({message: "Map not found"})
        return
    }
    let space=await client.$transaction(async()=>{
        const space=await client.space.create({
            data:{
                name:parsedSpaceData.data.name,
                width:map.width,
                height:map.height,
                creatorId:req.userId!
            }
        })
        await client.spaceElements.createMany({
            data:map.mapElements.map(e=>({
                spaceId:space.id,
                elementId:e.elementId,
                x:e.x!,
                y:e.y!
            }))
        })
    return space

    })
    console.log("space created")
res.json({spaceId:space.id})
}
   


catch(e){return res.status(403).json({message:"Something went wrong"})}


})

router.delete('/space/:spaceId',async(req,res)=>{
    const id:any=req.params.spaceId
    try{ 
const existence=await client.space.findUnique({where:{id:id},select:{creatorId:true}})
if(!existence){return res.status(403).json({message:"Space doesnot exist"})}
if(existence.creatorId!==req.userId){  res.status(403).json({message: "Unauthorized"})}
        const dbDataDelete=await client.space.delete({
            where:{id:id}
          })
    return    res.status(400).json({message:'space deleted'})}
    catch(e){
    return    res.status(403).json({message:"Something went wrong"})}
  
})
router.get('/space/all',async(req,res)=>{
     const authHeader=req.headers.authorization
        const token:any=authHeader?.split("")[1] 
            const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload
            const id:any=decoded.userId 
    try{
        const dbData=await client.space.findMany({
where:{creatorId:id},
select:{
name:true,
id:true,
height:true,
width:true,
thumbnail:true
}
        })
      return  res.status(200).json({dbData})}
    catch(e){
 return res.status(403).json({message:"Something went wrong"})
    }
})
router.get('/space/:spaceId',async(req,res)=>{

const id:any=req.params.spaceId
try{const dbData=await client.space.findUnique({where:{id:id}, 
    include:{
spaceElements:{
    include:{
        element:true
    }
}
}})
if(!dbData){ return res.status(403).json({message:"Data not found"})}

return res.status(200).json({
    "dimensions":`${dbData.height}x${dbData.width}`,
spaceElements:dbData.spaceElements.map(e=>({
id:e.id,
element:{
    id:e.element?.id,
    imageUrl:e.element?.imageUrl,
    width:e.element?.width,
    height:e.element?.height,
    static:e.element?.static
},
x:e.x,
y:e.y
}))
})}
catch(e){
   return res.status(403).json({message:"Something went wrong"})
}
})
router.post('/space/element',async(req,res)=>{
    const body=req.body
    const parsedResult=spaceElements.safeParse(body)
if(!parsedResult.success){
   return res.status(400).json({message:"invalid inputs"})
    }
    const space=await client.space.findUnique({
        where:{id:parsedResult.data.spaceId,
            creatorId:req.userId!
        },
        select:{
            width:true,
            height:true
        }
    })
    if(!space){
        return res.status(400).json({message:"Space not found"})
    }
    if(parsedResult.data.x<0 || parsedResult.data.y<0 || parsedResult.data.x>space.width! || parsedResult.data.y>space.height!){
        return  
    }
    try{
        const dbData=await client.spaceElements.create({
           data:{
            elementId:parsedResult.data?.elementId,
            spaceId:parsedResult.data?.spaceId,
            x:parsedResult.data.x,
            y:parsedResult.data.y
           } 
        })
   return     res.status(200).json({message:"element created"})
    }
    catch(e){
         return  res.status(403).json({message:"Something went wrong"})
    }



})
router.delete('/space/element/:id',async(req,res)=>{
    const id:any=req.params.id
try{
const deleteData=await client.spaceElements.deleteMany({where:{spaceId:id}})
   return res.status(200).json({message:"element deleted"})
}

catch(e){
 return   res.status(403).json({message:"Something went wrong"})
}
})

router.get('/elements',async(req,res)=>{
    try{
const authHeader=req.headers.authorization
    const token:any=authHeader?.split("")[1] 
        const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload
        const id:any=decoded.userId 
const elements=await client.element.findMany({
    where:{creatorId:id}
})
     return    res.json({elements}).status(200)
    }
   
    catch(e){
 return      res.status(403).json({message:"Something went wrong"})   
    }
})
