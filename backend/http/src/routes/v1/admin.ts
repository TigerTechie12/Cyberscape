import { Router } from "express";
import { mapCreator,updateImage,avatarInputs,adminMap } from "common";
import {client} from '@repo/db/client'
const router=Router()

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
    const id=req.params
    const body=req.body
    const parsedData=updateImage.safeParse(body)
if(!parsedData.success){
       return res.json({message:"Wrong Inputs"})
}
try{
    const dbData=
    
    res.status(200).json({message:"Inputs updated"})

}
catch(e){}

})
router.post('/admin/avatar',(req,res)=>{
const body=req.body
if(!avatarInputs.safeParse(body).success){
    res.json({message:"Wrong Inputs"})
}
//db logic
res.status(200).json({avatarId})

})
router.post('/admin/map',(req,res)=>{
const body=req.body
if(!adminMap.safeParse(body).success){
    res.json({message:"Wrong Inputs"})
}
//db logic
res.status(200).json({mapId})

})

