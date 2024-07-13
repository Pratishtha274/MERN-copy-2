export default function Image({src,...rest}) {
   src =src && src.includes('https://') ? src : 'http://localhost:4000/uploads/' + src;
   /*if (src && src.startsWith('http://localhost:4000/uploads')) {
      src = src.replace('http://localhost:4000/uploads', 'https://pratishtha.vercel.app/uploads');
  }*/
  
   return(
    <img {...rest} src={src} alt={''} />
   )
}