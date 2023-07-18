const {connect2DB} = require('../db-config.js')

exports.addTicketsDetails = async (ticketData)=> {
    try {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('tickets');    
        const added_tickets =   await collection.insertOne(ticketData);

        return added_tickets
      } 
      catch (err){
        console.log(err)
      }
      
}

exports.updateTicketDetails = async (ticket_id,data) => {
    try {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('tickets');
        const ticket =   await collection.updateOne({'ticket_id': ticket_id},data);
        console.log(ticket);
        return ticket;
      } 
      catch (err){
        console.log(err)
        return []
      }
}

exports.getTicketDetails = async (ticket_id) => {
    const client = connect2DB();
    try {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('tickets');
        const ticket =   await collection.find({'ticket_id': ticket_id});
        console.log(ticket);
        return ticket;
      } 
      catch (err){
        console.log(err)
        return []
      }
      finally {
        client.close();
      }
}

exports.getTicketDetailsByUser = async (user) => {
  const client = connect2DB();
  try {
      await client.connect();
      const db = client.db('metro');
      const collection = db.collection('tickets');
      // const ticket =   await collection.findOne({'userid': user},{'projection': {
      //   source:1,
      //   destination: 1,
      //   userid: 1,
      //   status: 1}})
      // console.log(ticket,user,"YOJOJIJIUIHUHUHUHUHUhj")
      const ticket = await collection.find({'userid': user}).toArray()
      return ticket;
    } 
    catch (err){
      console.log(err)
      return []
    }
    
}


