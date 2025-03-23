import React from "react";
import { FaHeart, FaShoppingBasket } from "react-icons/fa";
import "./css/header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../../routes/route";
import useShopeStore from "../../../store/Store";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { basket, favorites,sorrtProduc,sercInputFun } = useShopeStore();
  const handleSort =(e)=>{
    sorrtProduc(e.target.value)
  }
  const handleSearch = (e)=>{
   sercInputFun(e.target.value)
  }
  return (
    <header className="header">
      <div className="headera_left">
        <select name="" id="" onChange={handleSort}>
          <option value="">select by</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Hight to Low">Price :Hight to Low</option>
          <option value="Low to Hight">Price :Low to Hight</option>
        </select>
        <button className="reser_btn">Reset</button>
      </div>

      <div className="header_nav">
        <div className="header-input">
          <input type="text" onChange={handleSearch} />
        </div>
        <div
          className={`header_link ${
            location.pathname === ROUTES.HOME ? "active" : ""
          }`}
          onClick={() => navigate(ROUTES.HOME)}
        >
          Home
        </div>
        <div
          className={`header_link ${
            location.pathname === ROUTES.PRODUCTS ? "active" : ""
          }`}
          onClick={() => navigate(ROUTES.PRODUCTS)}
        >
          Products
        </div>
      </div>
      <div className="header_right">
        <div
          className={`header_right_icon ${
            location.pathname === ROUTES.BASKET ? "active" : ""
          }`}
          onClick={() => navigate(ROUTES.BASKET)}
        >
          <span>{basket.length}</span>
          <FaShoppingBasket size={33} color={location.pathname === ROUTES.BASKET ?"#007bff":""} />
        </div>
        <div
           className={`header_right_icon ${
            location.pathname === ROUTES.FAVORITES ? "active" : ""
          }`}
          onClick={() => navigate(ROUTES.FAVORITES)}
        >
          <span>{favorites.length}</span>
          <FaHeart size={33} color={location.pathname === ROUTES.FAVORITES ?"#007bff":""} />
        </div>
      </div>
    </header>
  );
};

export default Header;
