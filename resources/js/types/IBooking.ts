interface IBooking {
  booking_id: number,
  name: string,
  surname: string,
  phone: string,
  email: string | null,
  passport: string,
  price: number,
  destination: string,
  origin: string,
  travel_id: number,
  departure_DateTime: Date,
  arrival_DateTime: Date,
  tripNumber: number,
  plate_number: string,
  type: string
}

export default IBooking