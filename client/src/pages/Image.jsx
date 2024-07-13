export default function Image({src,...rest}) {
   src =src && src.includes('https://') ? src : 'http://localhost:4000/uploads/' + src;
   /*if (src && src.startsWith('http://localhost:4000/uploads')) {
      src = src.replace('http://localhost:4000/uploads', 'https://pratishtha.vercel.app/uploads');
  }*/
      const isLocal = src && src.includes('http://localhost:4000/uploads/');
      const secureSrc = isLocal
        ? src.replace('http://localhost:4000/uploads/', 'https://pratishtha.vercel.app/uploads/')
        : src;
   return(
    <img {...rest} src={src} alt={''} />
   )
}
/*const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';

export default function Image({ src, ...rest }) {
    if (src) {
        src = src.startsWith('http://localhost') 
            ? src.replace('http://localhost:4000', 'https://pratishtha.vercel.app') 
            : src;
    } else {
        src = 'https://pratishtha.vercel.app/uploads/default.jpg'; // Fallback image
    }

    return <img {...rest} src={src} alt="" />;
}
*/