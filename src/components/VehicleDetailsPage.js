import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import './css/VehicleDetailsPage.css';
import { useParams, Link } from 'react-router-dom';

function VehicleDetailsPage() {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [formData, setFormData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false);

  let navigate = useNavigate();

    
  // Отправляем POST запрос для получения VehicleDTO по ID
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`/api/vehicle/get-one`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ vehicleId: parseInt(vehicleId) }),
        });

        if (response.ok) {
          const data = await response.json();
          setVehicle(data);
          setFormData(data);
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    //  Отправляет запрос для получения спска категорий транспорта для формирования выподающего меню
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category/');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    //  Отправляет запрос для получения спска типа транспорта для формирования выподающего меню
    const fetchTypes = async () => {
      try {
        const response = await fetch('/api/type/');
        if (response.ok) {
          const data = await response.json();
          setTypes(data);
        } else {
          console.log('Error:', response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVehicleDetails();
    fetchCategories();
    fetchTypes();
  }, [vehicleId]);

  //  Проверка на то, что введённые даныне отличаются от старого локального значения
  //  Если изменилось хоть одно поле, то показывать кнопку UPDATE 
  //  Если изменённые поля содержат невалидные данные, то показать сообщения ошибки
  useEffect(() => {
    const isFormEdited = () => {
      if (!vehicle || !formData) {
        return false;
      }

      return Object.keys(formData).some((key) => formData[key] !== vehicle[key]);
    };

    setIsFormChanged(isFormEdited());
  }, [vehicle, formData]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
 
  //  Отпрвка запроса для изменения данных VehicleDTO
  const handleSaveUpdate = async () => {
    try {
      const response = await fetch('/api/vehicle/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Update success
        setVehicle(formData);
        setErrorMessage(null);
        navigate("/", { replace: true });
        window.location.reload();
      } else {
        // Update failed
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div className="vehicle-details">
      <h2>Edit Vehicle</h2>
      <h5>Start editing the values in the input and the Update button will be displayed.</h5>
      
      <div className="details-container">
        <div className="details-row">
          <div className="details-label">Vehicle ID:</div>
          <input type="text" name="vehicleId" value={formData?.vehicleId || ''} disabled />
        </div>
        <div className="details-row">
          <div className="details-label">Brand:</div>
          <input type="text" name="brand" value={formData?.brand || ''} onChange={handleInputChange} />
        </div>
        <div className="details-row">
          <div className="details-label">Model:</div>
          <input type="text" name="model" value={formData?.model || ''} onChange={handleInputChange} />
        </div>
        <div className="details-row">
          <div className="details-label">Category:</div>
          <select name="category" value={formData?.category || ''} onChange={handleInputChange}>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="details-row">
          <div className="details-label">State Number:</div>
          <input type="text" name="stateNumber" value={formData?.stateNumber || ''} onChange={handleInputChange} />
        </div>
        <div className="details-row">
          <div className="details-label">Type:</div>
          <select name="type" value={formData?.type || ''} onChange={handleInputChange}>
            <option value="">Select type</option>
            {types.map((type) => (
              <option key={type.typeId} value={type.typeName}>
                {type.typeName}
              </option>
            ))}
          </select>
        </div>
        <div className="details-row">
          <div className="details-label">Year of Realise:</div>
          <input
            type="number"
            name="yearOfRealise"
            value={formData?.yearOfRealise || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="details-row">
          <div className="details-label">Has Trailer:</div>
            <select
              name="hasTrailer"
              value={formData?.hasTrailer.toString()}
              onChange={handleInputChange}
              >
              <option value="true">Yes</option>
             <option value="false">No</option>
          </select>
        </div>

      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {isFormChanged && <button onClick={handleSaveUpdate}>Update</button>}
    </div>
  );
}

export default VehicleDetailsPage;
