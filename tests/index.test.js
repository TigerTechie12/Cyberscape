import axios from 'axios';
const BACKEND_URL=""

describe('Authentication',()=>{
test('Admin is able to sign up only once',async()=>{
const username="testuser"+ Math.random()
const password="testpassword"
const response=await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
    username:username,  
    password:password,
    type:'admin'
})
expect(response.statusCode).toBe(200)

const updatedResponse=await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username:username,  
    password:password,
    type:'admin'
})
expect(updatedResponse.statusCode).toBe(400)
})
test('Signup request fails if the username is empty',async()=>{
    const username=`testuser`+ Math.random()
    const password="testpassword"
    const response= await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
        username:username
    })
    expect(response.statusCode).toBe(400)
})
test('Signin succeeds if the username and password are correct',async()=>{
    const username=`testuser` + Math.random()
    const password="testpassword"
    await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
        username:username,
        password:password,
})
const response=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
    username:username,
    password:password,
})
expect(response.statusCode).toBe(200)
expect(response.data.token).toBeDefined()
})
test('Signin fails if the username and password are incorrect',async()=>{
const username="testuser"+ Math.random()
const password="testpassword"
await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username:username,
    password:password,
})
const response=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
    username:"shjioshds",
    password:password
})
expect(response.statusCode).toBe(403)
})
})

describe('User Information Endpoints',()=>{
    let token=""
    let avatarId=""
  beforeAll(async()=>{
    const username=`test+${Math.random()}`
    const password="testpassword"
    await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
        username:username,
        password:password,
        type:'admin'
    })
  const response=  await axios.post(`${BACKEND_URL}/api/v1/signin`,{
username:username,
password:password
    })
token=response.data.token
const avatarResponse=await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
	"name": "Timmy"
})
avatarId=response.data.avatarId
  })
  test('User cant update their metadata with a wrong avatar id',async()=>{
const response=await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
    avatarId:"32242234"
},{headers:{"authorization":`Bearer ${token}`}})
expect(response.statusCode).toBe(400)
  })

  test("User can update their metadata with correct avatar id",async()=>{
    const response=await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
        avatarId:avatarId
    },{
        headers:{"authorization":`Bearer ${token}`}
    })
  expect(response.statusCode).toBe(200)
})
test("User forgot to send the headers in the request",async()=>{
    const response=await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
        avatarId:avatarId
    })
    except(response.statusCode).toBe(403)
})

describe("User avatar information",()=>{
let avatarId=""
let token=""
let userId=""
beforeAll(async()=>{
    const username=`test+${Math.random()}`
    const password="testpassword"
    const res= await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
        username:username,
        password:password,
        type:'admin'
    })
     const response=  await axios.post(`${BACKEND_URL}/api/v1/signin`,{
username:username,
password:password
    })
    const avatarResponse=await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
        	"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
	"name": "Timmy"
    })
avatarId=avatarResponse.data.avatarId
token=response.data.token
userId=res.data.userId

})
test("Get back avatar information for a user",async()=>{
const response=await axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`)

expect(response.data.avatars.length).toBe(1)
expect(response.data.avatars[0].userId).toBe(userId)
})


})

test("Available avatars lists the recently created avatar",async()=>{
    const response=await axios.get(`${BACKEND_URL}/api/v1/avatars`)
    expect(response.data.avatars.length).not.toBe(0)
    const currentAvatars=response.data.avatars.find(x =>x.id ===avatarId)
 expect(currentAvatars).toBeDefined()
})
})
describe("Space Information",()=>{
    let mapId=""
    let token=""
    let adminId=""
    let userId=""
    let userToken=""
    let element1Id=""
    let element2Id=""
beforeAll(async()=>{
const username=`test+${Math.random()}`
const password='testpassword'
const signupResponse=await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username:username,
    password:password,
    type:'admin'
})
adminId=signupResponse.data.userId
const response=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
    username:username,
    password:password
})
token=response.data.token
const element1=await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
    	"imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
	"width": 1,
	"height": 1,
  "static": true
},{headers:{"authorization":`Bearer ${token}`}})


const element2=await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
    	"imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
	"width": 1,
	"height": 1,
  "static": true
},{headers:{"authorization":`Bearer ${token}`}})
element1Id=element1.id
element2Id=element2.id
const map=await axios.post(`${BACKEND_URL}/api/v1/admin/map`,{
      "thumbnail": "https://thumbnail.com/a.png",
   "dimensions": "100x200",
   "name": "100 person interview room",
   "defaultElements": [{
		   elementId: element1Id,
		   x: 20,
		   y: 20
	   }, {
	     elementId: element2Id,
		   x: 18,
		   y: 20
	   }
   ]
},{headers:{"authorization":`Bearer ${token}`}})
mapId=map.data.id
const signupResponseUser=await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
    username:`user+${Math.random()}`,
    password:'testpassword',
    type:'user'
})
userId=signupResponseUser.data.userId
const signInResponse=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
    username:`user+${Math.random()}`,
password:"testpassword"
})
userToken=signInResponse.data.token

})    
test('User is able to create space',async()=>{
    const response=await axios.post(`${BACKEND_URL}/api/v1/space`,{
        "name":"Test",
        "dimensions":"100x100",
        "mapId":mapId
    },{headers:{"authorization":`Bearer ${userToken}`}})
    expect(response.spaceId).toBeDefined()
    expect(response.statusCode).toBe(200)
})
test("user is able to create space without mapId",async()=>{
    const response=await axios.post(`${BACKEND_URL}/api/v1/space`,{
        "name":"test",
        "dimensions":"100x100"
    },{headers:{"authorization":`Bearer ${userToken}`}})
expect(response.spaceId).toBeDefined()
expect(response.statusCode).toBe(200)
})

test("User fails to create space without mapId && dimensions",async()=>{
    const response=await axios.post(`${BACKEND_URL}/api/v1/space`,{
        "name":"test",

    },{headers:{"authorization":`Bearer ${userToken}`}})
})
expect(response.statusCode).toBe(400)
test("User is not able to delete a space that doesn't exist",async()=>{
    const response=await axios.delete(`${BACKEND_URL}/api/v1/space/randomIdDoesntExist`,{
        "name":"test"
    },{headers:{"authorization":`Bearer ${userToken}`}})
    expect(response.statusCode).toBe(400)
})

test("User is able to delete a space ",async()=>{
    const response=await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`,{
        "name":"test"
    },{headers:{"authorization":`Bearer ${userToken}`}})
    expect(response.statusCode).toBe(200)
})
test("User shouldnt be able to create spaces that are created by other users",async()=>{
    const response=await axios.delete(`${BACKEND_URL}/api/v1/space/${response.data.spaceId}`,{
      headers:{"authorization":`Bearer ${token}`}  
    })
expect(response.statusCode).toBe(403)
})
test("Admin has no spaces initially",async()=>{
    const res=await axios.get(`${BACKEND_URL}/api/v1/space/`,{
        "name":"test",
        "dimensions":"100x100"
    }
)
expect(res.data.spaces.length).toBe(0)
})
test("User has no spaces initially",async()=>{
const res=await axios.post(`${BACKEND_URL}/api/v1/space/all`,{
        "name":"test",
        "dimensions":"100x100"
    },{
        headers:{"authorization":`Bearer ${userToken}`}
    })
    const response=await axios.get(`${BACKEND_URL}/api/v1/space/all`,{
        headers:{"authorization":`Bearer ${userToken}`}
    })
const filteredSpaces=response.data.spaces.find(x=>x.id===res.data.spaceId)

    expect(res.data.spaces.length).toBe(1)
    expect(filteredSpaces).toBeDefined()

})

})
describe("Arena endpoints",async()=>{
  let mapId=""
    let admintoken=""
    let adminId=""
    let userId=""
    let userToken=""
    let element1Id=""
    let element2Id=""
    beforeAll(async()=>{
const username=`test+${Math.random()}`
const password="testpassword"
const userUsername=`test+${Math.random()}`
const userPassword='test'
const signupResponseAdmin=await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username,
    password,
    type:'admin'
})
adminId=signupResponseAdmin.data.userId
const signInResponseAdmin=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
    username,
    password
})
admintoken=signInResponseAdmin.data.token
const signupResponseUser=await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username:userUsername,
    password:userPassword,
    type:'user'
})
userId=signupResponseUser.data.userId
const signInResponseUser=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
    username:userUsername,
    password:userPassword
})
userToken=signInResponseUser.data.token
const element1=await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
    	"imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
	"width": 1,
	"height": 1,
  "static": true
},{headers:{"authorization":`Bearer ${admintoken}`}})


const element2=await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
    	"imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
	"width": 1,
	"height": 1,
  "static": true
},{headers:{"authorization":`Bearer ${admintoken}`}})
 element1Id=element1.data.id
element2Id=element2.data.id
const map=await axios.post(`${BACKEND_URL}/api/v1/admin/map`,{
 "thumbnail": "https://thumbnail.com/a.png",
   "dimensions": "100x200",
   "name": "100 person interview room",
   "defaultElements": [{
		   elementId: element1Id,
		   x: 20,
		   y: 20
	   }, {
	     elementId: element2Id,
		   x: 18,
		   y: 20
	   }]
},{headers:{"authorization":`Bearer ${userToken}`}})
mapId=map.data.id
const space=await axios.post(`${BACKEND_URL}/api/v1/space`,{
    	 "name": "Test",
   "dimensions": "100x200",
   "mapId": mapId

})
spaceId=space.spaceId
})
test("Incorrect spaceId returns a 400",async()=>{
    const response=await axios.get(`${BACKEND_URL}/api/v1/space/2132133`,{
        headers:{"authorization":`Bearer ${userToken}` }
    })
    expect(response.statusCode).toBe(400)
})
test("Correct spaceId returns all the elements",async()=>{
      const response=await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
          headers:{"authorization":`Bearer ${userToken}` }
      })
    expect(response.data.dimensions).toBe("100x200")
    expect(response.data.elements.length).toBe(2)
})
test("Delete endpoint is able to delete an element",async()=>{
    const response=await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`,{
        headers:{"authorization":`Bearer ${userToken}` }
    })
    const res=await axios.delete(`${BACKEND_URL}/api/v1/space/element`,{
        spaceId:spaceId,
        elementId:response.data.elements[0].id
    })
const newResponse=await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`)
expect(newResponse.data.elements.length).toBe(2)
})
test("Adding Element works as expected",async()=>{
    const res=await axios.post(`${BACKEND_URL}/api/v1/space/element`,{
        "elementId":element1Id,
        "spaceId":spaceId,
        'x':50,
        'y':34
    },{
          headers:{"authorization":`Bearer ${userToken}` }
    })
const response=await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`)
expect(response.data.elements.length).toBe(3)
})
test("Adding Element fails if the eleemnt lies outside the dimensions",async()=>{
    const res=await axios.post(`${BACKEND_URL}/api/v1/space/element`,{
        "elementId":element1Id,
        "spaceId":spaceId,
        'x':500000,
        'y':340000
    },{
         headers:{"authorization":`Bearer ${userToken}` }
    })
expect(res.statusCode).toBe(404)
})

})
describe("Create an element",async()=>{
let admintoken=''
let userToken=""
let userId=''
let adminId=''

beforeAll(async()=>{
const username=`test+${Math.random()}`
const password="testpassword"
const userUsername=`test+${Math.random()}`
const userPassword='test'
const signupResponseAdmin=await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username,
    password,
    type:'admin'
})
adminId=signupResponseAdmin.data.userId
const signInResponseAdmin=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
    username,
    password
})
admintoken=signInResponseAdmin.data.token
const signupResponseUser=await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username:userUsername,
    password:userPassword,
    type:'user'
})
userId=signupResponseUser.data.userId
const signInResponseUser=await axios.post(`${BACKEND_URL}/api/v1/signin`,{
    username:userUsername,
    password:userPassword
})
userToken=signInResponseUser.data.token
})
test("User is not able to hit the admin Endpoint",async()=>{
const res=await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
"imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"
	,"width": 1,
	"height": 1,
  "static": true 

},{headers:{"authorization":`Bearer ${userToken}`}})

const mapResponse=await axios.post(`${BACKEND_URL}/api/v1/admin/map`,{
    "thumbnail": "https://thumbnail.com/a.png",
   "dimensions": "100x200",
   "name": "100 person interview room",
   "defaultElements": [{}]
},{headers:{"authorization":`Bearer ${userToken}`}})

const avatarResponse=await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
	"name": "Timmy"
},{"authorization":`Bearer ${userToken}`

})
const updateResponse=await axios.put(`${BACKEND_URL}/api/v1/admin/element/:elementId`,{
    
	"imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"	

},{
    "authorization":`Bearer ${userToken}`
})


expect(res.statusCode).toBe(403)
expect(mapResponse.statusCode).toBe(403)
expect(avatarResponse.statusCode).toBe(403)
expect(updateResponse.statusCode).toBe(403)
})
test("Admin is able to hit the admin Endpoint",async()=>{
const res=await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
"imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"
	,"width": 1,
	"height": 1,
  "static": true 

},{headers:{"authorization":`Bearer ${admintoken}`}})

const mapResponse=await axios.post(`${BACKEND_URL}/api/v1/admin/map`,{
    "thumbnail": "https://thumbnail.com/a.png",
   "dimensions": "100x200",
   "name": "100 person interview room",
   "defaultElements": [{}]
},{headers:{"authorization":`Bearer ${admintoken}`}})

const avatarResponse=await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
    "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
	"name": "Timmy"
},{"authorization":`Bearer ${admintoken}`

})
const updateResponse=await axios.put(`${BACKEND_URL}/api/v1/admin/element/:elementId`,{
    
	"imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"	

},{
    "authorization":`Bearer ${admintoken}`
})


expect(res.statusCode).toBe(200)
expect(mapResponse.statusCode).toBe(200)
expect(avatarResponse.statusCode).toBe(200)
expect(updateResponse.statusCode).toBe(200)
})
test('Admin is able to update the imageUrl for an element',async()=>{
    const elementRes=await axios.post(`${BACKEND_URL}/api/v1/admin/element`,{
        "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"
	,"width": 1,
	"height": 1,
  "static": true
    },{"authorization":`Bearer ${admintoken}`})

    const updateRes=await axios.put(`${BACKEND_URL}/api/v1/admin/element/${elementRes.data.id}`,{
        "imageUrl": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE"	
    },{
        "authorization":`Bearer ${admintoken}`
    })
    expect(updateRes.statusCode).toBe(200)
})
})
