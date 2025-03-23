import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Text,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import useShopeStore from "../../../store/Store";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/route";
import { FaHeart } from "react-icons/fa";

// const getStars = (rating) => {
//   const fullStars = Math.floor(rating); // Tam ulduzların sayı
//   const halfStar = rating % 1 !== 0; // Yarım ulduz olub-olmadığını yoxla
//   const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Boş ulduzların sayı

//   let stars = "★".repeat(fullStars); // Tam ulduzları əlavə et
//   if (halfStar) stars += "☆"; // Yarım ulduz varsa, əlavə et
//   stars += "☆".repeat(emptyStars); // Boş ulduzları əlavə et

//   return stars;
// };
const CustomCard = ({ product, loading }) => {
  const { addTobasket, basket, addToFavorites, favorites,deleteFavorites } = useShopeStore();
  const [exsis, setExsisi] = useState(false);
  const [exsisFavorites, setExsisFavorites] = useState(false);
  const navigate = useNavigate();
  const addToCard = () => {
    addTobasket(product);
    toast.success("Sucsses product add to basket");
  };


  const addfavorites = () => {
    if (!exsisFavorites) {
      addToFavorites(product);
      toast.success("Sucsses product add to favorites");
    }else{
      deleteFavorites(product)
      setExsisFavorites(false)
      toast.info("Sucsses product remove to favorites");
    }
  };

  useEffect(() => {
    let exsisItem = basket.find((item) => item.id === product.id);
    if (exsisItem) {
      setExsisi(true);
    }
  }, [addToCard]);

  useEffect(() => {
    let exsisItem = favorites.find((item) => item.id === product.id);
    if (exsisItem) {
      setExsisFavorites(true);
    }
  }, [addfavorites]);
  return (
    <Skeleton
      height="100%"
      startColor="blue.100"
      endColor="blue.300"
      isLoaded={!loading}
    >
      <Card maxW="sm" height={758} overflow="hidden">
        <Image src={product?.thumbnail} />
        <CardBody>
          <CardHeader>
            <Heading size="md">{product?.title}</Heading>
          </CardHeader>
          <Text>{product?.description.substring(1, 200)}</Text>
          <Text fontSize="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
            ${product?.price}
            
          </Text>
        </CardBody>
        <CardFooter display="flex" gap="3" justifyContent={"space-between"}>
          {exsis ? (
            <Button
              colorScheme="green"
              variant="outline"
              onClick={() => navigate(ROUTES.BASKET)}
            >
              Go to cart
            </Button>
          ) : (
            <Button colorScheme="cyan" onClick={addToCard}>
              Add to cart
            </Button>
          )}
          <Button onClick={addfavorites}>
            <FaHeart color={exsisFavorites ? "red" : "white"} size={30} />
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => navigate(ROUTES.DETAIL + "/" + product.id)}
          >
            Go Details
          </Button>
        </CardFooter>
      </Card>
    </Skeleton>
  );
};

export default CustomCard;
