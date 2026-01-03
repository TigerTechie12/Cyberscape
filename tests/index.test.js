import axios from 'axios';
const BACKEND_URL=""

describe('Authentication',()=>{
test('User is able to sign up',async()=>{
const username="testuser"+ Math.random()
const password="testpassword"
const response=await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
    username:username,  
    password:password
})
expect(response.statusCode).toBe(200)
})

})