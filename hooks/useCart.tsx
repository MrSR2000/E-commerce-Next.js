import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { Caprasimo } from "next/font/google";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleQtyDecrement: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setcartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItem");
    const cartProductsFromLocalStorage: CartProductType[] | null =
      JSON.parse(cartItems);

    setcartProducts(cartProductsFromLocalStorage);
  }, []);

  const handleAddProductToCart = useCallback(
    (product: CartProductType) => {
      setcartProducts((prev) => {
        let updatedCart;

        if (prev) {
          updatedCart = [...prev, product];
        } else {
          updatedCart = [product];
        }

        localStorage.setItem("eShopCartItem", JSON.stringify(updatedCart));
        return updatedCart;
      });

      toast.success("Product added to cart");
    },
    [cartProducts]
  );

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProduct = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setcartProducts(filteredProduct);
        localStorage.setItem("eShopCartItem", JSON.stringify(filteredProduct));
      }
      toast.success("Product Removed from Cart");
    },
    [cartProducts]
  );

  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCartProduct;

      if (product.quantity === 20) {
        return toast.error("Opps! Maximum product quantity reached");
      }

      if (cartProducts) {
        updatedCartProduct = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCartProduct[existingIndex].quantity = ++updatedCartProduct[
            existingIndex
          ].quantity;
        }

        setcartProducts(updatedCartProduct);
        localStorage.setItem(
          "eShopCartItem",
          JSON.stringify(updatedCartProduct)
        );
      }
      toast.success("Incremented Quantity");
    },
    [cartProducts]
  );

  const handleQtyDecrement = useCallback(
    (product: CartProductType) => {
      let updatedCartProduct;

      if (product.quantity == 0) {
        toast.error("Minimum qty limit reached");
      } else {
        if (cartProducts) {
          updatedCartProduct = [...cartProducts];

          const existingIndex = cartProducts.findIndex(
            (item) => item.id === product.id
          );

          if (existingIndex > -1) {
            updatedCartProduct[existingIndex].quantity = --updatedCartProduct[
              existingIndex
            ].quantity;
          }

          setcartProducts(updatedCartProduct);
          localStorage.setItem(
            "eShopCartItem",
            JSON.stringify(updatedCartProduct)
          );
        }
      }
    },
    [cartProducts]
  );

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleQtyDecrement,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
