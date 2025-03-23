import axios from "axios";

export const gelAllProdcuts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
