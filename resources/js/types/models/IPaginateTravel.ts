import IPaginate from "../IPaginate";
import ITravel from "../ITravel";


interface IPaginateTravel extends IPaginate{
  data: Array<ITravel>
}

export default IPaginateTravel