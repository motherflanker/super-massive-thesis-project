import IPaginate from "../IPaginate";
import ITrip from "../ITrip";


interface IPaginateTrip extends IPaginate {
  data: Array<ITrip>
}

export default IPaginateTrip