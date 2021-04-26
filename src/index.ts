import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {userRouter} from './routers/admin.router'
import {tokenGuard} from './middlewares/token-guard'
import { venueAdminRouter } from './routers/venueAdmin.router'
import { TravelAgencyAdminRouter } from './routers/travelAgencyAdmin.router'

const app = express()
const port = 3000

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`)
})
console.log("checking")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use('/', userRouter)
app.use('/venue', venueAdminRouter)
app.use('/travelAgency', TravelAgencyAdminRouter)

app.use(tokenGuard())

app.get('/hello', (req,res) =>{
    res.json("Hello");
})


