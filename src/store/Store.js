import { create } from "zustand";
import { persist } from "zustand/middleware";
import { gelAllProdcuts } from "../services/getAllProducts";

const useShopeStore = create(
  persist(
    (set) => ({
      basket: [],
      products: [],
      favorites: [],
      loading: false,
      totalPrice: 0,
      searchInput: "",
      sortProduct: "",
      addTobasket: (product) => {
        set((state) => {
          const updatedBasket = [...state.basket, { ...product, count: 1 }];
          return {
            basket: updatedBasket,
            totalPrice: updatedBasket.reduce(
              (sum, item) => sum + item.price * item.count,
              0
            ),
          };
        });
      },
      fetchAllProducts: async () => {
        set({ loading: true });
        const response = await gelAllProdcuts();
        set({ products: response.products, loading: false });
      },
      addToFavorites: (product) => {
        set((state) => ({
          favorites: [...state.favorites, product],
        }));
      },
      deleteFavorites: (product) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== product.id),
          totalPrice: state.basket.reduce(
            (sum, item) => sum + item.price * item.count,
            0
          ),
        }));
      },
      removeFromBasket: (productId) => {
        set((state) => {
          const updatedBasket = state.basket.filter(
            (item) => item.id !== productId
          );
          return {
            basket: updatedBasket,
            totalPrice: updatedBasket.reduce(
              (sum, item) => sum + item.price * item.count,
              0
            ),
          };
        });
      },

      incrementCount: (productId) => {
        set((state) => {
          const updatedBasket = state.basket.map((item) =>
            item.id === productId ? { ...item, count: item.count + 1 } : item
          );
          return {
            basket: updatedBasket,
            totalPrice: updatedBasket.reduce(
              (sum, item) => sum + item.price * item.count,
              0
            ),
          };
        });
      },

      decrementCount: (productId) => {
        set((state) => {
          const updatedBasket = state.basket.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  count: item.count > 1 ? item.count - 1 : (item.count = 1),
                }
              : item
          );
          return {
            basket: updatedBasket,
            totalPrice: updatedBasket.reduce(
              (sum, item) => sum + item.price * item.count,
              0
            ),
          };
        });
      },
      clearBasket: () => {
        set(() => ({
          basket: [],
          totalPrice: 0,
        }));
      },
      sercInputFun: (input) => {
        set(() => ({
          searchInput: input,
        }));
      },
      sorrtProduc: (input) => {
        set(() => ({
          sortProduct: input,
        }));
      },
    }),
    {
      name: "shop-storage",
    }
  )
);
export default useShopeStore;
