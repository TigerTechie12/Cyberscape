import 'dotenv/config'
import { WebSocketServer } from 'ws'
import { createUser } from './User.js'

const wss = new WebSocketServer({ port: 3001 })

wss.on('connection', (ws) => {
    console.log('[WS] new connection')
    const user = createUser(ws)

    ws.on('close', () => {
        console.log('[WS] connection closed')
        user.destroy()
    })

    ws.on('error', (err) => {
        console.error('[WS] error:', err)
    })
})

console.log('WebSocket server running on port 3001')
