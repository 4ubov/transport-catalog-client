import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();
    //  При вызове, перенаправляет по указанному роуту и перезагружает страницу (Что бы данные обновились)
    function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }

  //  Header с двумя ссылками
  return (
    <div className="header">
        <Link to="/" onClick={() => changeLocation('/')} className="goToMain"> Main page </Link>
        
        <Link to="/add" className="goToAdd"> Add Vehicle </Link>
    </div>
  );
}

export default Header;
