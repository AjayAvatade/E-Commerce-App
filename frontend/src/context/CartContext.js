import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


// =========================================================
// CREATE CART CONTEXT
// =========================================================

const CartContext = createContext();


// =========================================================
// CART PROVIDER
// =========================================================

export const CartProvider = ({ children }) => {

    // -------------------------------------------------------
    // Get cart from localStorage
    // -------------------------------------------------------

    const [cartItems, setCartItems] = useState(() => {

        const savedCart =
            localStorage.getItem("cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];
    });


    // -------------------------------------------------------
    // Save cart to localStorage whenever it changes
    // -------------------------------------------------------

    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);


    // =====================================================
    // ADD TO CART
    // =====================================================

    const addToCart = (product, quantity = 1) => {

        setCartItems((currentItems) => {

            const existingItem =
                currentItems.find(
                    (item) =>
                        item._id === product._id
                );


            // ------------------------------------------------
            // Product already exists
            // ------------------------------------------------

            if (existingItem) {

                return currentItems.map((item) =>

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


            // ------------------------------------------------
            // New product
            // ------------------------------------------------

            return [
                ...currentItems,

                {
                    ...product,
                    quantity
                }
            ];
        });
    };


    // =====================================================
    // REMOVE FROM CART
    // =====================================================

    const removeFromCart = (productId) => {

        setCartItems((currentItems) =>

            currentItems.filter(
                (item) =>
                    item._id !== productId
            )
        );
    };


    // =====================================================
    // INCREASE QUANTITY
    // =====================================================

    const increaseQuantity = (productId) => {

        setCartItems((currentItems) =>

            currentItems.map((item) =>

                item._id === productId

                    ? {
                        ...item,

                        quantity:
                            item.quantity + 1
                    }

                    : item
            )
        );
    };


    // =====================================================
    // DECREASE QUANTITY
    // =====================================================

    const decreaseQuantity = (productId) => {

        setCartItems((currentItems) =>

            currentItems.map((item) => {

                if (
                    item._id === productId &&
                    item.quantity > 1
                ) {
                    return {
                        ...item,

                        quantity:
                            item.quantity - 1
                    };
                }

                return item;

            })
        );
    };


    // =====================================================
    // CLEAR CART
    // =====================================================

    const clearCart = () => {

        setCartItems([]);

    };


    // =====================================================
    // CART COUNT
    // =====================================================

    const cartCount = cartItems.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    // =====================================================
    // SUBTOTAL
    // =====================================================

    const subtotal = cartItems.reduce(
        (total, item) =>
            total +
            Number(item.price) *
            item.quantity,
        0
    );


    // =====================================================
    // DELIVERY CHARGE
    // =====================================================

    const deliveryCharge =
        subtotal === 0
            ? 0
            : subtotal >= 999
                ? 0
                : 79;


    // =====================================================
    // TOTAL
    // =====================================================

    const total =
        subtotal +
        deliveryCharge;


    // =====================================================
    // CONTEXT VALUE
    // =====================================================

    const value = {

        cartItems,

        cartCount,

        subtotal,

        deliveryCharge,

        total,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart
    };


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};


// =========================================================
// CUSTOM HOOK
// =========================================================

export const useCart = () => {

    const context =
        useContext(CartContext);


    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }


    return context;
};