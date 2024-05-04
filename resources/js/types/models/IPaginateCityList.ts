import ICityList from "../ICityList";
import IPaginate from "../IPaginate";


interface IPaginateCityList extends IPaginate{
  data: Array<ICityList>
}

export default IPaginateCityList