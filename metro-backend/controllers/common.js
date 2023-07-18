exports.checkInTicket = async (ticket_id) => {
    try {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('tickets');
        const ticket = await collection.updateOne({'ticket_id': ticket_id},{$set: {status: "checkedin"}})
        // return ticket;
        console.log(ticket,"INsideeee checkINNNNNN")
      } 
      catch (err){
        console.log(err)
        // return []
      }
    
  }