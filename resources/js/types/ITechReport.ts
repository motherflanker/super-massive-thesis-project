interface ITechReport{
  report_id: number,
  bus_id: number,
  text: string,
  isDone: boolean,
  price: number,
  startsAt: Date,
  endsAt: Date
}

export default ITechReport