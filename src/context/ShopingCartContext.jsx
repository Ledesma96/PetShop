import { createContext, useState,useEffect } from "react";

export const CartContext = createContext(null);

export const ShoppingCartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
      });
    const [updateCart, setUpdateCart] = useState(0)
      
      useEffect(() => {
        if (cart.length === 0) {
          async function fetchCart() {
            try {
              const response = await fetch("http://localhost:8080/api/carts",{
                method:"POST"
              });
              if (response.status === 201) {
                const data = await response.json();
                setCart(data._id);
                localStorage.setItem("cart", JSON.stringify(data._id));
              }
            } catch (error) {
              console.log("Error al crear el carrito", error);
            }
          }
          fetchCart();
        } else {
          console.log("Este usuario ya tiene un carrito");
        }
      }, []);
      
    

    return (
        <CartContext.Provider value={[cart, setCart, updateCart, setUpdateCart]}>
            {children}
        </CartContext.Provider>
    );
};
