import Image from "./pages/Image";

export default function serviceImg({service,index=0,className=null}) {
    if(!service.photos?.length){
        return '';
    }
    if(!className){
        className='object-cover';
    }
    return(
    
            <Image className={className} src={service.photos[0]} alt=""/>
    
    )
}