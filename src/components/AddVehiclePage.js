import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddVehiclePage({ vehicles, setVehicles }) {

  //  Объект VehicleDTO для добавления нового пользоввтеля
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    category: '',
    stateNumber: '',
    type: '',
    yearOfRealise: '',
    hasTrailer: '',
  });

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  //  Отправляет запрос для получения спска категорий транспорта для формирования выподающего меню
  useEffect(() => {
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

    fetchCategories();
    fetchTypes();
  }, []);

  //  Подстановка значений в локальный объект VehicleDTO
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //  Запрос для добавления нового пользователя в БД, request body формируется из данных inputs
  const handleAddVehicle = async () => {
    try {
      const response = await fetch('/api/vehicle/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //  Если транспорт добавлен успешно, то меняем локальный список всего транспорта
        //  И редиректим на главную страницу и обновляем её
        const newVehicle = formData;
        setVehicles([...vehicles, newVehicle]); // Update the vehicle list with the new vehicle
        navigate('/', { replace: true }); // Navigate to the main page
        window.location.reload();
      } else {
        // Если не удалось добавить транспорт в БД, выводим ошибки
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-vehicle-page">
      <h2>Add New Vehicle</h2>
      <div className="details-container">
        <div className="details-row">
          <div className="details-label">Brand:</div>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            placeholder="Enter brand"
          />
        </div>
        <div className="details-row">
          <div className="details-label">Model:</div>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            placeholder="Enter model"
          />
        </div>
        <div className="details-row">
          <div className="details-label">Category:</div>
          <select name="category" value={formData.category} onChange={handleInputChange}>
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
          <input
            type="text"
            name="stateNumber"
            value={formData.stateNumber}
            onChange={handleInputChange}
            placeholder="Enter state number"
          />
        </div>
        <div className="details-row">
          <div className="details-label">Type:</div>
          <select name="type" value={formData.type} onChange={handleInputChange}>
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
            value={formData.yearOfRealise}
            onChange={handleInputChange}
            placeholder="Enter year of realise"
          />
        </div>
        <div className="details-row">
          <div className="details-label">Has Trailer:</div>
          <select name="hasTrailer" value={formData.hasTrailer} onChange={handleInputChange}>
            <option value="">Select option</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button onClick={handleAddVehicle}>Create</button>
    </div>
  );
}

export default AddVehiclePage;
