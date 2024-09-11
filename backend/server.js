const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require ("./config/database")

// configration 
dotenv.config({path:"backend/config/config.env"})

// database connectivity check
connectDatabase()


app.listen(process.env.PORT,()=>{

console.log(`server is working on http://localhost:${process.env.PORT}`)

})