import React, { useEffect } from "react";
import CustomCard from "../../common/components/cards/Card";
import useShopeStore from "../../store/Store";
import '../products/css/product.css'

const Favorites = () => {
  const { favorites, fetchAllProducts, loading } = useShopeStore();

  useEffect(() => {
    fetchAllProducts();
  }, []);


  return (
    <div className="products_container">

      {
        favorites.length > 0 ? (
          favorites?.map((product, i) => (
            <CustomCard product={product} key={i} loading={loading} />
          ))
        ) : (
          <div className="empty_basket">Not Yet Favorites</div>
        )
      }
    
    </div>
  );
};

export default Favorites;

