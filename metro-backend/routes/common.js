const commonRouter = require('express').Router();
const {checkInTicket} = require('../controllers/common.js')

commonRouter.post('/checkin',async (req,res,next)=>{
    try{
        console.log(req.query.ticket_id,typeof(req.query.ticket_id))
    const result = await checkInTicket(req.query.ticket_id)
    res.json({ok:true, result:result})
    }
    catch(err) {
      res.json({ok:false,err:err})
    }
  })

module.exports = commonRouter
