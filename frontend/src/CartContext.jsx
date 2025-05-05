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

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : []
    })

    const [currency, setCurrency] = useState(() => {
        const savedCurrency = localStorage.getItem('currency')
        return savedCurrency || 'MAD'
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

    const addToFavorites = (product) => {
        console.log("adding to favorites: ", product);
        setFavorites((prevFavorites) => {
            const foundItem = prevFavorites.find((item) => item._id === product._id)
            if(!foundItem) {
                return [...prevFavorites, product]
            }
            return prevFavorites
        })
    }

    // save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        localStorage.setItem('favorites', JSON.stringify(favorites))
        localStorage.setItem('currency', currency)
    }, [cart, favorites, currency])

    return(
        <CartContext.Provider value={{cart, setCart, addToCart, favorites, setFavorites, addToFavorites, currency, setCurrency}}>
            {children}
        </CartContext.Provider>
    )
}


