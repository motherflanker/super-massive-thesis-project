interface IBooking {
  booking_id: string,
  name: string,
  surname: string,
  phone: string,
  email: string | null,
  passport: string,
  price: number,
  destination: string,
  origin: string,
  trip_id: number,
  departure_DateTime: Date,
  arrival_DateTime: Date,
}

export default IBooking