const ticketRouter = require('express').Router();
const {addTicketsDetails,getTicketDetails} = require('../controllers/tickets.js')

ticketRouter.post('/tickets',(req,res,next) => {
    const result = addTicketsDetails(req.body)
    res.send(result)
    var instance = new Razorpay({
        key_id: 'rzp_test_92eFbocTnB8nWt',
        key_secret: 'I6nniSFsiGn9pIW3qTGCJ98A',
    });

    const order = instance.orders.create({
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          key1: "value3",
          key2: "value2"
        }
      })
    })
