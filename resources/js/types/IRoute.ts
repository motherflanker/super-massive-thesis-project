interface IRoute {
  route_id: number,
  destination: string,
  origin: string,
  twoway: boolean,
  city_list_id: number
}

export default IRoute