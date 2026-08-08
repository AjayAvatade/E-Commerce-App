import React from "react";
import { useNavigate } from "react-router-dom";

function DealCard({
    title,
    description,
    discount,
    image,
    buttonText = "Shop Now",
    category
}) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (category) {
            navigate(
                `/products?category=${encodeURIComponent(category)}`
            );
        } else {
            navigate("/products");
        }
    };

    return (
        <div className="deal-card">

            {/* Deal Image */}
            <div className="deal-image-wrapper">
                <img
                    src={image}
                    alt={title}
                    className="deal-image"
                />

                {/* Discount Badge */}
                {discount && (
                    <div className="deal-discount">
                        {discount}% OFF
                    </div>
                )}
            </div>


            {/* Deal Content */}
            <div className="deal-content">

                <span className="deal-label">
                    LIMITED TIME
                </span>

                <h3>
                    {title}
                </h3>

                <p>
                    {description}
                </p>

                <button
                    className="deal-button"
                    onClick={handleClick}
                >
                    {buttonText}
                    <span>→</span>
                </button>

            </div>

        </div>
    );
}

export default DealCard;