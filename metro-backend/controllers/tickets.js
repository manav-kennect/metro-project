const {connect2DB} = require('../db-config.js')

exports.addTicketsDetails = async (ticketData)=> {
    const client = connect2DB();
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
      finally {
        client.close();
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
