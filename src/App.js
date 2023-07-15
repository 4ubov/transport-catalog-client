import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route , Link} from 'react-router-dom';
import VehicleList from './components/VehicleList';
import VehicleDetailsPage from './components/VehicleDetailsPage';
import VehicleFilter from './components/VehicleFilter';
import AddVehiclePage from './components/AddVehiclePage';
import Header from './components/Header';

import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  
  //  Отправка запроса для получения всех VehicleDTO с сервера
  useEffect(() => {
    fetch('/api/vehicle/')
      .then((response) => response.json())
      .then((data) => {
        setVehicles(data);
        setFilteredVehicles(data);
      })
      .catch((error) => console.log(error));
  }, [setVehicles,setFilteredVehicles]);

  //  Отправка запроса для с фильтрами и получение List<VehicleDTO> отфильтрованный 
  const handleFilter = (filterData) => {
    fetch('/api/vehicle/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filterData),
    })
      .then((response) => response.json())
      .then((data) => {
        setFilteredVehicles(data);
      })
      .catch((error) => console.log(error));
  };

  const handleRefresh = () => {
    setFilteredVehicles(vehicles);
  };

  //  Роуты с компонентами
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <VehicleList vehicles={filteredVehicles} />
                <VehicleFilter handleFilter={handleFilter} handleRefresh={handleRefresh} />
              </>
            }
          />
          <Route
            path="/add"
            element={<AddVehiclePage vehicles={vehicles} setVehicles={setVehicles} />}
          />
          <Route path="/vehicle/:vehicleId" element={<VehicleDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
