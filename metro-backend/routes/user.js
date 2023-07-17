const {addUser} = require('../controllers/user.js')
const userRouter = require('express').Router();

userRouter.post('/addUser',async (req,res,next)=>{
   const response =  await addUser(req.body)
   console.log(response,"ADD USER")
   res.send(response)
})

module.exports = userRouter;