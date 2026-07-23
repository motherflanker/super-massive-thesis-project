import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '@/Pages/LoginPage';
import Bookings from '@/Pages/Bookings';
import BookingsView from '@/Pages/BookingsView';
import TripsRoutes from '@/Pages/TripsRoutes';
import TripsView from '@/Pages/TripsView';
import RoutesAdd from '@/Pages/RoutesAdd';
import RoutesView from '@/Pages/RoutesView';
import Cities from '@/Pages/Cities';
import CityView from '@/Pages/CityView';
import Travels from '@/Pages/Travels';
import TravelsView from '@/Pages/TravelsView';
import TravelsAdd from '@/Pages/TravelsAdd';
import Buses from '@/Pages/Buses';
import BusesView from '@/Pages/BusesView';
import BusesAdd from '@/Pages/BusesAdd';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <ProtectedRoute path="bookings" component={Bookings} roles={["manager"]} />
        <ProtectedRoute path="bookings/{booking}" component={BookingsView} roles={["manager"]}  />

        <ProtectedRoute path="trips" component={TripsRoutes} roles={["manager"]}  />
        <ProtectedRoute path="trips/{trip}" component={TripsView} roles={["manager"]}  />

        <ProtectedRoute path="routes/add" component={RoutesAdd} roles={["manager"]}  />
        <ProtectedRoute path="routes/{route}" component={RoutesView} roles={["manager"]}  />

        <ProtectedRoute path="cities" component={Cities} roles={["manager"]}  />
        <ProtectedRoute path="cities/{city}" component={CityView} roles={["manager"]}  />

        <ProtectedRoute path="travels" component={Travels} roles={["manager"]}  />
        <ProtectedRoute path="travels/{city}" component={TravelsView} roles={["manager"]}  />
        <ProtectedRoute path="travels/add" component={TravelsAdd} roles={["manager"]}  />

        <ProtectedRoute path="buses" component={Buses} roles={["manager", 'operator']}  />
        <ProtectedRoute path="buses{bus}" component={BusesView} roles={["manager", 'operator']} />
        <ProtectedRoute path="buses/add" component={BusesAdd} roles={["manager", 'operator']}  />

      </Routes>
    </Router>
  );
};

export default AppRoutes;