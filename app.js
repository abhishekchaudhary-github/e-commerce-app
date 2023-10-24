const express = require('express')
require('express-async-errors')
require('dotenv').config()
const app = express()

const morgan = require('morgan')

const connectdb = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler') //applies try catch to all middlewares
const authRouter = require('./routes/authRoutes')

app.use(morgan('tiny'))
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('/api/v1/auth',authRouter)
})
app.use(authRouter)
app.use(notFound)
app.use(errorHandler)

const start = async () => {
    try {
        await connectdb(process.env.MONGO_URI)
        app.listen(5000,()=>{
        console.log('listening to ports 5000')
    })}
    catch(err){
        console.log(err)
    }
}

start()