import React, { useEffect, useState } from "react";
import useShopeStore from "../../../store/Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../../../routes/route";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Text,
  Heading,
} from "@chakra-ui/react";
import { FaHeart, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import DeleteModal from "../modal/DeleteModal";

const BasketCard = ({ product }) => {
  const { addToFavorites, favorites, deleteFavorites ,incrementCount,decrementCount,removeFromBasket} = useShopeStore();
  const [exsisFavorites, setExsisFavorites] = useState(false);
  const [isOpen,setIsOpen] = useState(false)
  const [productId,setProductid]= useState(null)
  const navigate = useNavigate();
   
  const addfavorites = () => {
    if (!exsisFavorites) {
      addToFavorites(product);
      toast.success("Sucsses product add to favorites");
    } else {
      deleteFavorites(product);
      setExsisFavorites(false);
      toast.info("Sucsses product remove to favorites");
    }
  };
const deleteModal = (id)=>{
    setIsOpen(true)
    setProductid(id)
}
const removeProduct =()=>{
    removeFromBasket(productId)
    setIsOpen(false)
    toast.success("sucsess delete ptoduct")
}
const closeModal =()=>{
    setIsOpen(false)
    setProductid(null) 
}
  useEffect(() => {
    let exsisItem = favorites.find((item) => item.id === product.id);
    if (exsisItem) {
      setExsisFavorites(true);
    }
  }, [addfavorites]);
  return (
    <div>
      <Card maxW="sm" height={758} overflow="hidden" p="4" border="1px solid #ddd">
        <Image src={product?.thumbnail} borderRadius="md" />

        <CardBody>
          <CardHeader>
            <Heading size="md">{product?.title}</Heading>
          </CardHeader>
          <Text>{product?.description.substring(1, 100)}</Text>
          <Text fontSize="xl" fontWeight="bold" mt="2">
            ${product?.price}
          </Text>
        </CardBody>

        <CardFooter display="flex" gap="3" justifyContent="space-between">
          <Button onClick={addfavorites}>
            <FaHeart color={exsisFavorites ? "red" : "white"} size={20} />
          </Button>

          <Button
            colorScheme="blue"
            onClick={() => navigate(ROUTES.DETAIL + "/" + product.id)}
          >
            Go Details
          </Button>

          <Button colorScheme="red" onClick={()=>deleteModal(product.id)}>
            <FaTrash size={18} />
          </Button>
        </CardFooter>

        {/* Sayı artırıb azaltmaq üçün düymələr */}
        <CardFooter
          display="flex"
          gap="2"
          justifyContent="space-between"
          alignItems={"center"}
          mt="2"
        >
          <div style={{display:"flex",gap:"10px"}}>
            <Button size="sm" onClick={()=>decrementCount(product.id)}>
              <FaMinus />
            </Button>

            <Text fontSize="lg">{product.count}</Text>

            <Button size="sm" onClick={()=> incrementCount(product.id)}>
              <FaPlus />
            </Button>
          </div>
          <Text fontSize="xl" fontWeight="bold">
            ${product?.price * product.count}
          </Text>
        </CardFooter>
      </Card>
      <DeleteModal isOpen={isOpen} onClose={closeModal} deletoProduct={removeProduct}/>
    </div>
  );
};

export default BasketCard;
