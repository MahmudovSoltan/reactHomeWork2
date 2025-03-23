import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useShopeStore from "../../store/Store";
import { toast } from "react-toastify";
import { ROUTES } from "../../routes/route";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Text,
  Heading,
  Box,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {
    addTobasket,
    basket,
    addToFavorites,
    deleteFavorites,
    favorites,
    products,
  } = useShopeStore();
  const navigate = useNavigate();
  const [exsisFavorites, setExsisFavorites] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    let productDetail = products.find((item) => item.id == id);
    setProduct(productDetail);
  }, [id, products]);

  useEffect(() => {
    let exsisItem = favorites.find((item) => item.id === product?.id);
    setExsisFavorites(!!exsisItem);

    let inBasket = basket.find((item) => item.id === product?.id);
    setInCart(!!inBasket);
  }, [favorites, basket, product]);

  const addToCart = () => {
    addTobasket(product);
    setInCart(true);
    toast.success("Product added to basket!");
  };

  const toggleFavorite = () => {
    if (exsisFavorites) {
      deleteFavorites(product);
      setExsisFavorites(false);
      toast.info("Product removed from favorites!");
    } else {
      addToFavorites(product);
      setExsisFavorites(true);
      toast.success("Product added to favorites!");
    }
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <Card
      maxW="100%"
      display={"flex"}
      borderRadius="lg"
      mt={3}
      overflow="hidden"
      boxShadow="lg"
    >
      <div style={{display:"flex",height:"100vh",alignItems:"center"}}>
        <div style={{width:"50%",height:"100%"}}>
          <Image
            src={product?.thumbnail}
            alt={product?.title}
            w="100%"
            h="100%"
            objectFit="contain"
          />
        </div>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"300px"}}>
          <CardBody >
            <CardHeader>
              <Heading size="md" textAlign="center">
                {product?.title}
              </Heading>
            </CardHeader>

            <Box display="flex" justifyContent="center" mb="1">
              <Badge colorScheme="purple" fontSize="1rem">
                {product?.category}
              </Badge>
            </Box>

            <Text fontSize="md" color="gray.600" textAlign="center" px="4">
              {product?.description}
            </Text>

            <Text
              fontSize="2xl"
              fontWeight="bold"
              textAlign="center"
              color="green.500"
              mt="3"
            >
              ${product?.price}
            </Text>

            <Text fontSize="md" color="gray.500" textAlign="center" mt="1">
              ⭐ {product?.rating} / 5
            </Text>
          </CardBody>
          <CardFooter display="flex" gap="3">
            {inCart ? (
              <Button
                colorScheme="green"
                onClick={() => navigate(ROUTES.BASKET)}
              >
                Go to Cart
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={addToCart}>
                Add to Cart
              </Button>
            )}

            <Button
              onClick={toggleFavorite}
              colorScheme={exsisFavorites ? "red" : "gray"}
            >
              <FaHeart color="white" size={20} />
              <Text ml="2">
                {exsisFavorites ? "Remove from Favorites" : "Add to Favorites"}
              </Text>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default Details;
