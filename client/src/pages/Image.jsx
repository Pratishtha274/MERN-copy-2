/*export default function Image({ src, ...rest }) {
    // Base URL for development and production from environment variables
    const uploadsBaseURL = import.meta.env.VITE_UPLOADS_BASE_URL || 'https://pratishtha-booking-app.s3.ap-southeast-2.amazonaws.com/uploads/';

    if (src) {
        // Replace local URL with production URL if necessary
        const isLocal = src.includes('http://localhost:4000/uploads/');
        src = isLocal
            ? src.replace('http://localhost:4000/uploads/', 'https://pratishtha-booking-app.s3.ap-southeast-2.amazonaws.com/uploads/')
            : src;
    } else {
        // Fallback image if src is not defined
        src = `${uploadsBaseURL}default.jpg`;
    }
    const handleError = (e) => {
        e.target.src = `${uploadsBaseURL}default.jpg`; // Fallback image
    };

    return (
        <img {...rest} src={src} alt="" />
    );
}*/
export default function Image({ src, ...rest }) {
    const uploadsBaseURL = import.meta.env.VITE_UPLOADS_BASE_URL;

    if (src) {
        // Check if the src is a local path or a URL
        const isLocal = src.includes('http://localhost:4000/uploads/');
        const isS3 = src.includes('https://pratishtha-booking-app.s3.ap-southeast-2.amazonaws.com/uploads');

        // Construct the correct URL
        if (isLocal) {
            src = src.replace('http://localhost:4000/uploads/', uploadsBaseURL);
        } else if (!isS3) {
            src = uploadsBaseURL + src; // Fallback to the uploadsBaseURL
        }
    } else {
        // Fallback image if src is not defined
        src = `${uploadsBaseURL}default.jpg`;
    }

    return <img {...rest} src={src} alt="" />;
}

