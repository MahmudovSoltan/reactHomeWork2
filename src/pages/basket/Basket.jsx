import React from "react";
import useShopeStore from "../../store/Store";
import BasketCard from "../../common/components/basket/BasketCard";
import "./css/basket.css";
const Basket = () => {
  const { basket, totalPrice ,clearBasket} = useShopeStore();

  console.log(basket, totalPrice);

  return (
    <>
      <div className="basket_header">
        <div>
        {totalPrice}
        </div>
        <button onClick={clearBasket}>
          Remove all
        </button>
      </div>

      <div className="basket_container">
        {basket.length > 0 ? (
          basket?.map((product, i) => <BasketCard key={i} product={product} />)
        ) : (
          <div className="empty_basket"> Basket is empty</div>
        )}
      </div>
    </>
  );
};

export default Basket;
