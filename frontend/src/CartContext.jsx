import React, {useContext, createContext, useState, useEffect} from 'react'

const CartContext = createContext()

export function useCart(){
    return useContext(CartContext)
}

export function CartProvider({children}) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : [] 
    })

    const addToCart = (product) => {
        console.log("adding to cart: ", product)
        setCart((prevCart) => {
            const foundItem = prevCart.find((item) => item._id === product._id)
            if(!foundItem){
                return [...prevCart, {...product, quantity: 1}]
            }
            return prevCart;
        })
    }

    // save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    return(
        <CartContext.Provider value={{cart, setCart, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}


