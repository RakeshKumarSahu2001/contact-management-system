import express from 'express'
import cors from 'cors'
import mongoConnection from './mongoConnection.js'
import route from './routes/route.js'
import dotenv from 'dotenv'
dotenv.config({path:"./.env"})


const app = express()
app.use(express.json())
app.use(cors({
    credentials:true
}))
app.use('/',route)

mongoConnection(process.env.MONGOURI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(`Mongodb connection error : ${err}`))



app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(`Express conection error : ${err}`)
    } else {
        console.log('Express connected successfully')
    }
})