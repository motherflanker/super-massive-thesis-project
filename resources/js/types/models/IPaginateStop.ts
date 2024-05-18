
import IPaginate from "../IPaginate"
import IStops from "../IStops"


interface IPaginateStop extends IPaginate{
  data: Array<IStops>
}

export default IPaginateStop