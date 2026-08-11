import React, { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {

    // =====================================================
    // TEMPORARY PRODUCTS
    // Later these will come from MongoDB
    // =====================================================

    const products = [
        {
            _id: "1",
            name: "Premium Wireless Headphones",
            category: "Electronics",
            price: 2499,
            oldPrice: 3999,
            rating: 4.8,
            reviews: 124,
            image:
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
        },

        {
            _id: "2",
            name: "Smart Watch",
            category: "Electronics",
            price: 1999,
            oldPrice: 2999,
            rating: 4.6,
            reviews: 89,
            image:
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
        },

        {
            _id: "3",
            name: "Classic White Sneakers",
            category: "Fashion",
            price: 1799,
            oldPrice: 2499,
            rating: 4.7,
            reviews: 156,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
        },

        {
            _id: "4",
            name: "Leather Backpack",
            category: "Accessories",
            price: 1299,
            oldPrice: 1999,
            rating: 4.5,
            reviews: 76,
            image:
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
        },

        {
            _id: "5",
            name: "Minimalist Desk Lamp",
            category: "Home",
            price: 899,
            oldPrice: 1299,
            rating: 4.4,
            reviews: 64,
            image:
                "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600"
        },

        {
            _id: "6",
            name: "Cotton Casual T-Shirt",
            category: "Fashion",
            price: 699,
            oldPrice: 999,
            rating: 4.6,
            reviews: 112,
            image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
        },

        {
            _id: "7",
            name: "Modern Coffee Mug",
            category: "Home",
            price: 399,
            oldPrice: 599,
            rating: 4.3,
            reviews: 48,
            image:
                "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600"
        },

        {
            _id: "8",
            name: "Premium Sunglasses",
            category: "Accessories",
            price: 1499,
            oldPrice: 2199,
            rating: 4.7,
            reviews: 91,
            image:
                "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
        }
    ];


    // =====================================================
    // STATES
    // =====================================================

    const [search, setSearch] = useState("");

    const [category, setCategory] =
        useState("All");

    const [sort, setSort] =
        useState("default");


    // =====================================================
    // CATEGORIES
    // =====================================================

    const categories = [
        "All",
        ...new Set(
            products.map((product) =>
                product.category
            )
        )
    ];


    // =====================================================
    // FILTER + SEARCH + SORT
    // =====================================================

    const filteredProducts = useMemo(() => {

        let result = [...products];


        // Search

        if (search.trim() !== "") {

            result = result.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
            );
        }


        // Category

        if (category !== "All") {

            result = result.filter(
                (product) =>
                    product.category === category
            );
        }


        // Sort

        if (sort === "price-low") {

            result.sort(
                (a, b) =>
                    a.price - b.price
            );

        } else if (sort === "price-high") {

            result.sort(
                (a, b) =>
                    b.price - a.price
            );

        } else if (sort === "rating") {

            result.sort(
                (a, b) =>
                    b.rating - a.rating
            );
        }


        return result;

    }, [search, category, sort]);


    return (

        <main className="products-page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <section className="products-header">

                <span className="products-eyebrow">
                    SHOPORA COLLECTION
                </span>

                <h1>
                    Explore Our Products
                </h1>

                <p>
                    Discover products selected
                    just for you.
                </p>

            </section>


            {/* =================================================
                FILTER SECTION
            ================================================= */}

            <section className="products-controls">


                {/* Search */}

                <div className="products-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


                {/* Category */}

                <div className="products-category">

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                    >

                        {categories.map(
                            (item) => (

                                <option
                                    key={item}
                                    value={item}
                                >
                                    {item}
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* Sort */}

                <div className="products-sort">

                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(
                                e.target.value
                            )
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

                    </select>

                </div>

            </section>


            {/* =================================================
                RESULTS COUNT
            ================================================= */}

            <div className="products-result-info">

                <p>
                    Showing{" "}
                    <strong>
                        {filteredProducts.length}
                    </strong>{" "}
                    products
                </p>

            </div>


            {/* =================================================
                PRODUCTS
            ================================================= */}

            <section className="products-section">

                {filteredProducts.length > 0 ? (

                    <div className="products-grid">

                        {filteredProducts.map(
                            (product) => (

                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />

                            )
                        )}

                    </div>

                ) : (

                    <div className="products-empty">

                        <div>
                            🔍
                        </div>

                        <h2>
                            No Products Found
                        </h2>

                        <p>
                            Try searching for
                            something else.
                        </p>

                        <button
                            onClick={() => {
                                setSearch("");
                                setCategory("All");
                                setSort("default");
                            }}
                        >
                            Clear Filters
                        </button>

                    </div>

                )}

            </section>

        </main>
    );
}

export default Products;