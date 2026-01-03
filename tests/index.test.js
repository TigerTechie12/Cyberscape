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

