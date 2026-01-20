import { Router } from "express";
import { mapCreator,updateImage,avatarInputs,adminMap } from "common";
import {client} from '@repo/db/client'
const router=Router()
import { adminMiddleware } from "src/middleware/admin.js";
router.use(adminMiddleware)
router.post('/admin/element',async(req,res)=>{
    const body=req.body
    const parsedData=mapCreator.safeParse(body)
if(!parsedData.success){
  return  res.json({message:"Wrong Inputs"})
}
try{const dbData=await client.element.create({
    data:{
        imageUrl:parsedData.data.imageUrl,
        width:parsedData.data.width,
        height:parsedData.data.height,
        static:parsedData.data.static
    }
})
const id=dbData.id
return res.status(200).json({id})
}
catch(e){
    return res.status(403).json({
        message:"Something went wrong"
    })
}

})
router.put('/admin/element/:elementId',async(req,res)=>{
    const id:any=req.params.elementId
    const body=req.body
    const parsedData=updateImage.safeParse(body)
if(!parsedData.success){
       return res.json({message:"Wrong Inputs"})
}
try{
    const dbData=await client.element.update({
        where:{id:id},
        data:{
            imageUrl:parsedData.data.imageUrl
        }
    })
    
   return res.status(200).json({message:"Inputs updated"})

}
catch(e){
    
    return res.status(403).json({
        message:"Something went wrong"
    })
}

})
router.post('/admin/avatar',async(req,res)=>{
const body=req.body
const parsedResult=avatarInputs.safeParse(body)
if(!parsedResult.success){
  return  res.json({message:"Wrong Inputs"})
}
try{ const dbData=await client.avatar.create({data:{  imageUrl:parsedResult.data?.imageUrl,
    name:parsedResult.data?.name}
  
})
const avatarId=dbData.id
    
    return res.status(200).json({avatarId})}
catch(e){

    return res.status(403).json({
        message:"Something went wrong"
    })
}


})
router.post('/admin/map',async(req,res)=>{
const body=req.body
const parsedResult=adminMap.safeParse(body)
if(!parsedResult.success){
  return  res.json({message:"Wrong Inputs"})
}
try{
const mapData=await client.maps.create({
    data:{thumbnail:parsedResult.data.thumbnail,
        name:parsedResult.data.name,
        height:parseInt(parsedResult.data.dimensions.split("x")[0]!),
        width:parseInt(parsedResult.data.dimensions.split("x")[1]!),
       mapElements:{
        create:parsedResult.data.defaultElements.map(e=>({
            elementId:e.elementId,
            x:e.x,
            y:e.y
        }))
       }
        
    }
})
const mapId=mapData.id

  return  res.status(200).json({mapId})
}
catch(e){
    return res.status(403).json({
        message:"Something went wrong"
    })
}


})

