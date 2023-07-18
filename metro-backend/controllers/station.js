const {connect2DB} = require('../db-config.js')
const stationData = require('../utility/data/station-data.js')
let  stationCachedData =  require('../utility/cached-data.js')
const dijkstra = require('../utility/utility.js')

exports.addStationDetails = async ()=> {
    try {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('station_details');
            
          await collection.insertMany(stationData);
    
        // console.log('Adjacency matrix stored in MongoDB.', stationData);
        const databasesList = await client.db().admin().listDatabases();
 
        // console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
      } 
      catch (err){
        console.log(err)
      }
     
}

exports.getStationsDetails = async () => {
    try {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('station_details');
        const station_fetched_data =   await collection.find().toArray();
        console.log(station_fetched_data);
        return station_fetched_data;
      } 
      catch (err){
        console.log(err)
        return []
      }
}

exports.ticketFareCalculator = async (src,dest)=> {
    try {
        if(Object.keys(stationCachedData).length > 0 ) {
            console.log("Inside CACHED DAtA")
            if(stationCachedData[src][dest] <= 3) {
                return 10;
            }
            else if(stationCachedData[src][dest] >3 && stationCachedData[src][dest] <=8) {
                return 15
            }
            else if(stationCachedData[src][dest] >8 && stationCachedData[src][dest] <=15) {
                return 20
            }
    
            else if(stationCachedData[src][dest] >15 && stationCachedData[src][dest] <=22) {
                return 25
            }
            else {
                return 30
            }
            
        } 
        else {
        await client.connect();
        const db = client.db('metro');
        const collection = db.collection('station_details');
            
        const station_fetched_data =   await collection.find().toArray();
        // console.log(station_fetched_data,"FETCHEDDDDDDD")
        const bi_directional_graph = {}
        station_fetched_data.forEach((data,index)=>{   
            bi_directional_graph[data['station_id']] = data['linked_station']
        })

        console.log('Adjacency matrix stored in MongoDB.', bi_directional_graph);
        Object.keys(bi_directional_graph).forEach(key=>{
            stationCachedData[key] =  dijkstra(bi_directional_graph,key)
        })
        console.log(stationCachedData[src][dest])
        
        if(stationCachedData[src][dest] <= 3) {
            return 10;
        }
        else if(stationCachedData[src][dest] >3 && stationCachedData[src][dest] <=8) {
            return 15
        }
        else if(stationCachedData[src][dest] >8 && stationCachedData[src][dest] <=15) {
            return 20
        }

        else if(stationCachedData[src][dest] >15 && stationCachedData[src][dest] <=22) {
            return 25
        }
        else {
            return 30
        }
        
        
        

      } 
    }
      catch (err){
        console.log(err)
      }
     
}