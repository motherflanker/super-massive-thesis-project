import IPaginate from "../IPaginate";
import IRoute from "../IRoute";



interface IPaginateRoute extends IPaginate {
  data: Array<IRoute>
}

export default IPaginateRoute