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

const cartItems = "eShopCartItem";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleQtyDecrement: (product: CartProductType) => void;
  handleClearCart: () => void;
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
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  //use effect
  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItem");
    const cartProductsFromLocalStorage: CartProductType[] | null =
      JSON.parse(cartItems);

    setcartProducts(cartProductsFromLocalStorage);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.quantity * item.price;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          { total: 0, qty: 0 }
        );

        console.log("from here total qty ", qty);

        setCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };

    getTotals();
  }, [cartProducts]);

  console.log(`total amount = ${cartTotalAmount} total qty = ${cartTotalQty}`);

  //use callback
  const handleAddProductToCart = useCallback(
    (product: CartProductType) => {
      setcartProducts((prev) => {
        let updatedCart;

        if (prev) {
          updatedCart = [...prev, product];
        } else {
          updatedCart = [product];
        }

        localStorage.setItem(cartItems, JSON.stringify(updatedCart));
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
        localStorage.setItem(cartItems, JSON.stringify(filteredProduct));
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
        localStorage.setItem(cartItems, JSON.stringify(updatedCartProduct));
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
          localStorage.setItem(cartItems, JSON.stringify(updatedCartProduct));
        }
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setcartProducts(null);
    setCartTotalQty(0);

    localStorage.setItem(cartItems, JSON.stringify(null));

    toast.success("Cleared Cart");
  }, [cartProducts]);

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleQtyDecrement,
    handleClearCart,
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
