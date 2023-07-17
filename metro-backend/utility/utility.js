function minDistance(dist,sptSet,V)
{
    let min = Number.MAX_VALUE;
    let min_key = undefined;
    Object.keys(sptSet).forEach((key) => {
        if (sptSet[key] == false && dist[key] <= min) {
            {
                min = dist[key];
                min_key = key;
            }
        }
    });
    return min_key;
}




dijkstra = (graph,src)=>
{
    let dist = {};
    let sptSet = {};
    let V = Object.keys(graph).length
    Object.keys(graph).forEach((key) =>{
        dist[key] = Number.MAX_VALUE;
        sptSet[key] = false;
    })
     
    dist[src] = 0;
    
    console.log("LOCALYTION FOR DJISKRA ALGO")

    for(let count = 0; count < V; count++)
    {
        let u = minDistance(dist, sptSet);
        sptSet[u] = true;

        for (let j = 0; j < graph[u].length; j++) {
            let v = graph[u][j][0];
            let weight = graph[u][j][1];
            if (!sptSet[v] && dist[u] !== Infinity && dist[u] + weight < dist[v]) {
              dist[v] = dist[u] + weight;
            }
          }
    }

    return dist
     
}

module.exports = dijkstra