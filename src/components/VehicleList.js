import React from 'react';
import './css/VehicleList.css';
import { Link, useNavigate } from 'react-router-dom';

function VehicleList({ vehicles }) {
  const navigate = useNavigate();

  // Отслеживание нажатие клика
  const handleEditClick = (vehicleId) => {
    // Отправляем POST запрос для получения VehicleDTO по ID
    fetch('/api/vehicle/get-one', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vehicleId: vehicleId }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Перенаправление на страницу редактирования VehicleDTO
        navigate(`/vehicle/${vehicleId}`, { state: { vehicle: data } });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="vehicle-list-container">

      <div className="vehicle-list">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Category</th>
              <th>State Number</th>
              <th>Type</th>
              <th>Year of Realise</th>
              <th>Has Trailer</th>
              <th>Action</th>
            </tr>
          </thead>

          {
          //Выводим значения транспортных ср-в
          }
          
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle.vehicleId}>
                <td>{index + 1}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.category}</td>
                <td>{vehicle.stateNumber}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.yearOfRealise}</td>
                <td>{vehicle.hasTrailer ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleEditClick(vehicle.vehicleId)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default VehicleList;
