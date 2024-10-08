interface IPaginate {
  current_page: number,
  data: Array<unknown>,
  first_page_url: string,
  from: number,
  last_page: number,
  last_page_ulr: string,
  links: Array<unknown>,
  next_page_url: string,
  path: string,
  per_page: number,
  prev_pag_ulr: string,
  to: number,
  total: number
}

export default IPaginate