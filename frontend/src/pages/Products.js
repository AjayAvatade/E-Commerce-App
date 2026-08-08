import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";

function Products() {

    const [searchParams] = useSearchParams();

    const categoryFromURL = searchParams.get("category");

    const [selectedCategory, setSelectedCategory] = useState(
        categoryFromURL || "All"
    );

    const [sortOption, setSortOption] = useState("default");

    const [searchTerm, setSearchTerm] = useState("");


    /* =====================================================
       TEMPORARY PRODUCT DATA
       Later → MongoDB API
    ===================================================== */

    const products = [
        {
            _id: "1",
            name: "Premium Wireless Headphones",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
            price: 2499,
            oldPrice: 3999,
            rating: 4.6,
            reviews: 128,
            discount: 38,
            category: "Electronics"
        },
        {
            _id: "2",
            name: "Classic Casual Sneakers",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
            price: 1899,
            oldPrice: 2999,
            rating: 4.5,
            reviews: 94,
            discount: 37,
            category: "Fashion"
        },
        {
            _id: "3",
            name: "Modern Table Lamp",
            image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
            price: 1299,
            oldPrice: 1999,
            rating: 4.4,
            reviews: 76,
            discount: 35,
            category: "Home & Living"
        },
        {
            _id: "4",
            name: "Premium Skincare Set",
            image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600",
            price: 1599,
            oldPrice: 2499,
            rating: 4.7,
            reviews: 156,
            discount: 36,
            category: "Beauty"
        },
        {
            _id: "5",
            name: "Smart Watch Series 5",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
            price: 3299,
            oldPrice: 4999,
            rating: 4.5,
            reviews: 211,
            discount: 34,
            category: "Electronics"
        },
        {
            _id: "6",
            name: "Minimalist Backpack",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
            price: 999,
            oldPrice: 1599,
            rating: 4.3,
            reviews: 82,
            discount: 38,
            category: "Fashion"
        },
        {
            _id: "7",
            name: "Indoor Decorative Plant",
            image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",
            price: 699,
            oldPrice: 999,
            rating: 4.4,
            reviews: 65,
            discount: 30,
            category: "Home & Living"
        },
        {
            _id: "8",
            name: "Professional Makeup Kit",
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
            price: 2199,
            oldPrice: 3299,
            rating: 4.6,
            reviews: 119,
            discount: 33,
            category: "Beauty"
        }
    ];


    /* =====================================================
       CATEGORIES
    ===================================================== */

    const categories = [
        "All",
        "Electronics",
        "Fashion",
        "Home & Living",
        "Beauty"
    ];


    /* =====================================================
       FILTER + SEARCH + SORT
    ===================================================== */

    const filteredProducts = useMemo(() => {

        let result = [...products];


        // Category filter
        if (selectedCategory !== "All") {
            result = result.filter(
                (product) =>
                    product.category === selectedCategory
            );
        }


        // Search
        if (searchTerm.trim() !== "") {

            const search = searchTerm.toLowerCase();

            result = result.filter(
                (product) =>
                    product.name
                        .toLowerCase()
                        .includes(search) ||
                    product.category
                        .toLowerCase()
                        .includes(search)
            );
        }


        // Sorting
        if (sortOption === "price-low") {

            result.sort(
                (a, b) => a.price - b.price
            );

        } else if (sortOption === "price-high") {

            result.sort(
                (a, b) => b.price - a.price
            );

        } else if (sortOption === "rating") {

            result.sort(
                (a, b) => b.rating - a.rating
            );

        } else if (sortOption === "discount") {

            result.sort(
                (a, b) => b.discount - a.discount
            );
        }


        return result;

    }, [
        selectedCategory,
        searchTerm,
        sortOption
    ]);


    /* =====================================================
       ADD TO CART
    ===================================================== */

    const handleAddToCart = (product) => {

        console.log(
            "Product added to cart:",
            product
        );

    };


    return (
        <div className="products-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="products-header">

                <div>

                    <span className="section-label">
                        SHOPORA STORE
                    </span>

                    <h1>
                        All Products
                    </h1>

                    <p>
                        Discover products you'll love.
                    </p>

                </div>

            </section>


            {/* =================================================
                PRODUCTS CONTENT
            ================================================= */}

            <section className="products-container">


                {/* =============================================
                    TOP CONTROLS
                ============================================= */}

                <div className="products-controls">


                    {/* Search */}

                    <div className="products-search">

                        <span>
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                    </div>


                    {/* Sort */}

                    <select
                        className="sort-select"
                        value={sortOption}
                        onChange={(e) =>
                            setSortOption(e.target.value)
                        }
                    >

                        <option value="default">
                            Sort By
                        </option>

                        <option value="price-low">
                            Price: Low to High
                        </option>

                        <option value="price-high">
                            Price: High to Low
                        </option>

                        <option value="rating">
                            Highest Rated
                        </option>

                        <option value="discount">
                            Biggest Discount
                        </option>

                    </select>

                </div>


                {/* =============================================
                    CATEGORY FILTER
                ============================================= */}

                <div className="product-categories">

                    {categories.map((category) => (

                        <button
                            key={category}
                            className={
                                selectedCategory === category
                                    ? "category-filter active"
                                    : "category-filter"
                            }
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                        >
                            {category}
                        </button>

                    ))}

                </div>


                {/* =============================================
                    RESULTS INFO
                ============================================= */}

                <div className="products-result-info">

                    <p>
                        Showing{" "}
                        <strong>
                            {filteredProducts.length}
                        </strong>{" "}
                        products
                    </p>

                </div>


                {/* =============================================
                    PRODUCT GRID
                ============================================= */}

                {filteredProducts.length > 0 ? (

                    <div className="products-grid products-page-grid">

                        {filteredProducts.map(
                            (product) => (

                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onAddToCart={
                                        handleAddToCart
                                    }
                                />

                            )
                        )}

                    </div>

                ) : (

                    <div className="no-products">

                        <div className="no-products-icon">
                            🔍
                        </div>

                        <h2>
                            No Products Found
                        </h2>

                        <p>
                            Try another search or category.
                        </p>

                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setSelectedCategory("All");
                            }}
                        >
                            Clear Filters
                        </button>

                    </div>

                )}

            </section>

        </div>
    );
}

export default Products;