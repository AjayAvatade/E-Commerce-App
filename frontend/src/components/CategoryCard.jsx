import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryCard({ name, image, category }) {
    const navigate = useNavigate();

    const handleCategoryClick = () => {
        navigate(`/products?category=${encodeURIComponent(category)}`);
    };

    return (
        <div
            className="category-card"
            onClick={handleCategoryClick}
        >
            <div className="category-image-wrapper">
                <img
                    src={image}
                    alt={name}
                    className="category-image"
                />
            </div>

            <h3>{name}</h3>
        </div>
    );
}

export default CategoryCard;