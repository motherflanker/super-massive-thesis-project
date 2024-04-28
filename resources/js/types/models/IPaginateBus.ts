import IBus from "../IBus"
import IPaginate from "../IPaginate"


interface IPaginateBus extends IPaginate{
  data: Array<IBus>
}

export default IPaginateBus