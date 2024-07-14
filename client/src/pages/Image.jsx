export default function Image({ src, ...rest }) {
    // Base URL for development and production from environment variables
    const uploadsBaseURL = import.meta.env.VITE_UPLOADS_BASE_URL || 'https://pratishtha-booking-app.s3.ap-southeast-2.amazonaws.com/uploads/';

    if (src) {
        // Replace local URL with production URL if necessary
        const isLocal = src.includes('http://localhost:4000/uploads/');
        src = isLocal
            ? src.replace('http://localhost:4000/uploads/', 'https://pratishtha.vercel.app/uploads/')
            : src;
    } else {
        // Fallback image if src is not defined
        src = `${uploadsBaseURL}default.jpg`;
    }

    return (
        <img {...rest} src={src} alt="" />
    );
}
