import IBooking from "../IBooking";
import IPaginate from "../IPaginate";


interface IPaginateBooking extends IPaginate{
  data: Array<IBooking>
}

export default IPaginateBooking