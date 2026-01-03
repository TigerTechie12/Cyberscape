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

})
