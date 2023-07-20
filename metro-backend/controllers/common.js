let stationCachedData = require("../utility/cached-data.js");
const moment = require("moment");
exports.checkInTicket = async (
  ticket_id,
  checkin_station,
  source,
  created_at
) => {
  if (source === checkin_station) {
    if (
      moment().isBefore(moment(created_at, "dddd, MMMM Do YYYY, h:mm:ss a").add(20, "minutes"))
    ) {
      console.log("INSIDE CHEKC INNNNNN");
      try {
        await client.connect();
        const db = client.db("metro");
        const collection = db.collection("tickets");
        const ticket = await collection.updateOne(
          { ticket_id: ticket_id },
          { $set: { status: "checkedin" } }
        );
        return {ok:true, details: "Successfully Checked In"}
      } catch (err) {
        console.log(err);
        // return []
      }
    } else {
      return { ok: false, details: "Validity Expired" };
    }
  } else {
    return { ok: false, details: "failed" };
  }
};

exports.checkOutTicket = async (
  ticket_id,
  checkout_station_id,
  destination_id,
  source_id,
  created_at
) => {
  try {
    if (Object.keys(stationCachedData).length > 0) {
      console.log("Inside CACHED DAtA");
      if (
        stationCachedData[source_id][destination_id] >=
        stationCachedData[source_id][checkout_station_id]
      ) {
        const created_time = created_at;
        if (
          moment().isBefore(moment(created_at, "dddd, MMMM Do YYYY, h:mm:ss a").add(2, "hours"))       
           ) {
          console.log("INSIDE CHEKC OUTTTTT");
          await client.connect();
          const db = client.db("metro");
          const collection = db.collection("tickets");
          const ticket = await collection.updateOne(
            { ticket_id: ticket_id },
            { $set: { status: "checkedout" } }
          );
          return { ok: true, details: "checkedout" };
        } else {
          return { ok: false, details: "Validity Expired" };
        }
      } else {
        return { ok: false, details: "Please Contact Customer Care" };
      }
    } else {
      await client.connect();
      const db = client.db("metro");
      const collection = db.collection("station_details");

      const station_fetched_data = await collection.find().toArray();
      // console.log(station_fetched_data,"FETCHEDDDDDDD")
      const bi_directional_graph = {};
      station_fetched_data.forEach((data, index) => {
        bi_directional_graph[data["station_id"]] = data["linked_station"];
      });

      console.log("Adjacency matrix stored in MongoDB.", bi_directional_graph);
      Object.keys(bi_directional_graph).forEach((key) => {
        stationCachedData[key] = dijkstra(bi_directional_graph, key);
      });
      console.log(stationCachedData);
      if (
        stationCachedData[source_id][destination_id] >=
        stationCachedData[source_id][checkout_station_id]
      ) {
        const created_time = created_at;
        if (
          moment().isBefore(moment(created_at, "dddd, MMMM Do YYYY, h:mm:ss a").add(2, "hours"))  
        ) {
          console.log("INSIDE CHEKC INNNNNN");
          await db
            .collection("tickets")
            .updateOne(
              { ticket_id: ticket_id },
              { $set: { status: "checkedout" } }
            );
          return { ok: true, details: "checkedout" };
        } else {
          return { ok: false, details: "Validity Expired" };
        }
      } else {
        return { ok: false, details: "Please Contact Customer Care" };
      }
    }
  } catch (err) {
    console.log(err);
  }
};
