interface ITrip {
  trip_id: number,
  route_id: number,
  bus_id: number,
  destination: string,
  origin: string,
  city_list_id: number,
  name: string,
  surname: string,
  phone: string,
  max_seats: number,
  departure_DateTime: Date,
  arrival_DateTime: Date,
}

export default ITrip