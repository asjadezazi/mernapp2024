const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require ("./config/database")
// const error = require('./middleware/error')


process.on('uncaughtException',(err)=>{
    console.log(`error:${err.message}`)
    console.log('server has shut down due to server error')
    process.exit(1)
})

// console.log(err) server error 

// configration 
dotenv.config({path:"backend/config/config.env"})

// database connectivity check
connectDatabase()


const shutDown = app.listen(process.env.PORT,()=>{
console.log(`server is working on http://localhost:${process.env.PORT}`)
})

process.on('unhandledRejection',(err)=>{
    console.log(`error:${err.message}`)
    console.log('server has shut down due to unhandle prompts')
    shutDown.close(()=>{process.exit(1)})
})