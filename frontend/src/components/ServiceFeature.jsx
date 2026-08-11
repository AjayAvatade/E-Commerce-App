import React from "react";

function ServiceFeature({ icon, title, description }) {
    return (
        <div className="service-feature">

            <div className="service-icon">
                {icon}
            </div>

            <div className="service-content">

                <h3>
                    {title}
                </h3>

                <p>
                    {description}
                </p>

            </div>

        </div>
    );
}

export default ServiceFeature;