import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTES } from "./routes/route";
import {  ChakraProvider, extendTheme } from '@chakra-ui/react'
import { ToastContainer } from "react-toastify";
import Favorites from "./pages/favorites/Favorites";
import Loading from "./common/components/loading/Loading";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })
const Header = lazy(() => import("./common/components/leyouts/Header"));
const Home = lazy(() => import("./pages/home/Home"));
const Products = lazy(() => import("./pages/products/Products"));
const Basket = lazy(() => import("./pages/basket/Basket"));
const NoteFound = lazy(() => import("./pages/404/NoteFound"));
const Details = lazy(() => import("./pages/detail/Details"));
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={<Loading/>}>
        <Header />
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path={ROUTES.PRODUCTS} element={<Products />} />
            <Route path={ROUTES.DETAIL + "/:id"} element={<Details />} />
            <Route path={ROUTES.BASKET} element={<Basket />} />
            <Route path={ROUTES.FAVORITES} element={<Favorites />} />
            <Route path="*" element={<NoteFound />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </ChakraProvider>
  );
}

export default App;
