let stationData = [
    {station_name: 'ghatgopar', station_id: '1234', linked_station: [['2263', 3],['7890', 2]]}
    ,{station_name: 'jagrruti', station_id: '2263', linked_station: [['2264', 2],['1234', 3]]}
    ,{station_name: 'asalpha', station_id: '2264', linked_station: [['2265', 4],['2263', 2]]}
    ,{station_name: 'sakinaka', station_id: '2265', linked_station: [['2266', 1],['2264', 4],['2267', 2]]}
    ,{station_name: 'andheri', station_id: '2267', linked_station: [['2265', 2]]}
    ,{station_name: 'juhu', station_id: '2266', linked_station: [['2265', 1]]}
]

module.exports = stationData