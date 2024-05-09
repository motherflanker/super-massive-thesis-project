interface ITravel {
  travel_id: number,
  trip_id: number,
  tripNumber: number,
  destination: string,
  origin: string,
  name: string,
  surname: string,
  phone: string,
  bus_id: number,
  plate_number: string,
  max_seats: number,
  status: string,
  type: string,
  departure_DateTime: Date,
  arrival_DateTime: Date,
}

export default ITravel