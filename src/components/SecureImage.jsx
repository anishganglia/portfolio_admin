import React, { useState, useEffect } from "react";

const SecureImage = ({ id, fallback, style }) => {
    const [src, setSrc] = useState(fallback);

    useEffect(() => {
        // Only attempt to fetch if a valid id is provided.
        if (!id) {
            setSrc(fallback);
            return;
        }
        // Fetch the image with the custom header.
        fetch(`https://drs-sir-server.onrender.com/api/image/${id}`, {
            headers: { "x-api-key": "mySuperSecretKey123" }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.blob();
            })
            .then((blob) => {
                const objectURL = URL.createObjectURL(blob);
                setSrc(objectURL);
            })
            .catch((err) => {
                console.error("Error fetching image:", err);
                setSrc(fallback); // Fallback image if error occurs
            });
    }, [id, fallback]);

    return <img src={src} alt="secure" style={style} />;
};

export default SecureImage;
