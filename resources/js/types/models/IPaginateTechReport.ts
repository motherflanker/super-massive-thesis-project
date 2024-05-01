import IPaginate from "../IPaginate"
import ITechReport from "../ITechReport"


interface IPaginateTechReport extends IPaginate{
  data: Array<ITechReport>
}

export default IPaginateTechReport