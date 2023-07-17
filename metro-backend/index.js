require('dotenv').config();
const express = require('express');
const cors = require('cors')
const ticketRouter = require('../metro-backend/routes/tickets.js')
const stationRouter = require('../metro-backend/routes/station.js')
const userRouter = require('../metro-backend/routes/user.js')
const authRouter = require('../metro-backend/routes/auth.js')

const app = express();


app.use(cors())
app.use(express.json())

// app.use('/api',ticketRouter)
app.use('/api',stationRouter)
app.use('/api',userRouter)
app.use('/api',authRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server Started at Port ${process.env.PORT}`)
})