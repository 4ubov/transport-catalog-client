import React, { useState, useEffect } from 'react';
import './css/VehicleFilter.css';

function VehicleFilter({ handleFilter, handleRefresh }) {
  //  Объект Map<String, String> для хранения списка фильтров
  const [filterData, setFilterData] = useState({
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

    //  Отправляет запрос для получения спска типов транспорта для формирования выподающего меню
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

  //  Подстановка значений в локальный объект Map<String, String>
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const handleFilterSubmit = (event) => {
  event.preventDefault();

  const filterParams = {};

  // Добавление непустых значений фильтров в объект filterParams.
  Object.keys(filterData).forEach((key) => {
    const value = filterData[key];
    if (value !== '') {
      filterParams[key] = value;
    }
  });

  handleFilter(filterParams);
};

  //  При нажатии на кнопку Refresh все локальные данные обнуляются
  const handleRefreshClick = () => {
    setFilterData({
      brand: '',
      model: '',
      category: '',
      stateNumber: '',
      type: '',
      yearOfRealise: '',
      hasTrailer: '',
    });
    handleRefresh();
  };

  return (
    <div className="vehicle-filter">
      <h2>Filter</h2>
      <form onSubmit={handleFilterSubmit}>
        <div className="filter-row">
          <div className="filter-label">Brand:</div>
          <input
            type="text"
            name="brand"
            value={filterData.brand}
            onChange={handleInputChange}
            placeholder="Enter brand"
          />
        </div>
        <div className="filter-row">
          <div className="filter-label">Model:</div>
          <input
            type="text"
            name="model"
            value={filterData.model}
            onChange={handleInputChange}
            placeholder="Enter model"
          />
        </div>
        <div className="filter-row">
          <div className="filter-label">Category:</div>
          <select
            name="category"
            value={filterData.category}
            onChange={handleInputChange}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-row">
          <div className="filter-label">State Number:</div>
          <input
            type="text"
            name="stateNumber"
            value={filterData.stateNumber}
            onChange={handleInputChange}
            placeholder="Enter state number"
          />
        </div>
        <div className="filter-row">
          <div className="filter-label">Type:</div>
          <select name="type" value={filterData.type} onChange={handleInputChange}>
            <option value="">All types</option>
            {types.map((type) => (
              <option key={type.typeId} value={type.typeName}>
                {type.typeName}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-row">
          <div className="filter-label">Year of Realise:</div>
          <input
            type="number"
            name="yearOfRealise"
            value={filterData.yearOfRealise}
            onChange={handleInputChange}
            placeholder="Enter year of realise"
          />
        </div>
        <div className="filter-row">
          <div className="filter-label">Has Trailer:</div>
          <select name="hasTrailer" value={filterData.hasTrailer} onChange={handleInputChange}>
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="filter-row">
          <button type="submit">Apply Filter</button>
          <button type="button" onClick={handleRefreshClick}>
            Refresh
          </button>
        </div>
      </form>
    </div>
  );
}

export default VehicleFilter;