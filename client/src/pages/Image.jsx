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