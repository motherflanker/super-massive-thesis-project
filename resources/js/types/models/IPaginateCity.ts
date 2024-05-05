import ICity from "../ICity";
import IPaginate from "../IPaginate";


interface IPaginateCity extends IPaginate{
  data: Array<ICity>
}

export default IPaginateCity