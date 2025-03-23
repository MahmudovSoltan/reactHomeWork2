import React, { useEffect } from "react";
import CustomCard from "../../common/components/cards/Card";
import useShopeStore from "../../store/Store";
import "./css/product.css";

const Products = () => {
  const { products, fetchAllProducts, loading, sortProduct, searchInput } =
    useShopeStore();
let newProduct = products.filter((item)=>item.title.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
 useEffect(() => {
    fetchAllProducts();
  }, []);


  console.log(sortProduct);
  

  newProduct.sort((a, b) => {
    if (sortProduct === "Hight to Low") {
      return b.price - a.price;
    } else if (sortProduct === "Low to Hight") {
      return a.price - b.price;
    } else if (sortProduct === "A-Z") {
      return a.title.localeCompare(b.title); // ✅ Düzgün müqayisə
    } else if (sortProduct === "Z-A") {
      return b.title.localeCompare(a.title); // ✅ Düzgün müqayisə
    }
    return 0;
  });
  return (
    <div className="products_container">
      {newProduct?.map((product, i) => (
        <CustomCard product={product} key={i} loading={loading} />
      ))}
    </div>
  );
};

export default Products;
