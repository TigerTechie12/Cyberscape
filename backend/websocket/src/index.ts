import {WebSocket} from 'ws'
const ws=new WebSocket("")
ws.on('error',console.error)
ws.on('open',function open(){
    ws.send('something')
})
ws.on('message',function message(data:any){
console.log('received:%s',data)
})