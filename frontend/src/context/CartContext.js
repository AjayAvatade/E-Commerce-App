import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


// =========================================================
// CREATE CONTEXT
// =========================================================

const CartContext = createContext();


// =========================================================
// CART PROVIDER
// =========================================================

export function CartProvider({ children }) {

    // =====================================================
    // CART STATE
    // =====================================================

    const [cartItems, setCartItems] = useState(() => {

        try {

            const savedCart =
                localStorage.getItem("shoporaCart");

            return savedCart
                ? JSON.parse(savedCart)
                : [];

        } catch (error) {

            console.error(
                "Error loading cart:",
                error
            );

            return [];
        }
    });


    // =====================================================
    // SAVE CART TO LOCAL STORAGE
    // =====================================================

    useEffect(() => {

        localStorage.setItem(
            "shoporaCart",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);


    // =====================================================
    // ADD TO CART
    // =====================================================

    const addToCart = (product, quantity = 1) => {

        setCartItems((previousItems) => {

            const existingProduct =
                previousItems.find(
                    (item) =>
                        item._id === product._id
                );


            // Product already exists
            if (existingProduct) {

                return previousItems.map(
                    (item) =>

                        item._id === product._id

                            ? {
                                ...item,

                                quantity:
                                    item.quantity +
                                    quantity
                            }

                            : item
                );
            }


            // New product
            return [
                ...previousItems,

                {
                    ...product,
                    quantity
                }
            ];
        });
    };


    // =====================================================
    // UPDATE QUANTITY
    // =====================================================

    const updateQuantity = (
        productId,
        newQuantity
    ) => {

        if (newQuantity <= 0) {

            removeFromCart(productId);

            return;
        }


        setCartItems((previousItems) =>

            previousItems.map(
                (item) =>

                    item._id === productId

                        ? {
                            ...item,
                            quantity: newQuantity
                        }

                        : item
            )
        );
    };


    // =====================================================
    // REMOVE FROM CART
    // =====================================================

    const removeFromCart = (productId) => {

        setCartItems((previousItems) =>

            previousItems.filter(
                (item) =>
                    item._id !== productId
            )
        );
    };


    // =====================================================
    // CLEAR CART
    // =====================================================

    const clearCart = () => {

        setCartItems([]);
    };


    // =====================================================
    // GET CART TOTAL
    // =====================================================

    const getCartTotal = () => {

        return cartItems.reduce(
            (total, item) => {

                return (
                    total +
                    Number(item.price) *
                    Number(item.quantity)
                );

            },
            0
        );
    };


    // =====================================================
    // GET TOTAL ITEMS
    // =====================================================

    const getCartItemCount = () => {

        return cartItems.reduce(
            (total, item) => {

                return (
                    total +
                    Number(item.quantity)
                );

            },
            0
        );
    };


    // =====================================================
    // CONTEXT VALUE
    // =====================================================

    const value = {

        cartItems,

        addToCart,

        updateQuantity,

        removeFromCart,

        clearCart,

        getCartTotal,

        getCartItemCount

    };


    return (

        <CartContext.Provider value={value}>

            {children}

        </CartContext.Provider>
    );
}


// =========================================================
// CUSTOM HOOK
// =========================================================

export function useCart() {

    const context = useContext(CartContext);


    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }


    return context;
}