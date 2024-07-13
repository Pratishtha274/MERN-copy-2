import Image from "./pages/Image";

export default function ServiceGallery({ service }) {
    return (
        <div className="relative">
            <div className="grid grid-cols-2 gap-2 rounded-3xl overflow-hidden">
                {/* First Image */}
                {service.photos?.[0] && (
                    <div className="aspect-w-2 aspect-h-3">
                        <Image className="object-cover w-full h-full" src={service.photos?.[0]} alt="" />
                    </div>
                )}

                {/* Second Image */}
                {service.photos?.[1] && (
                    <div className="aspect-w-2 aspect-h-3">
                        <Image className="object-cover w-full h-full" src={service.photos?.[1]} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
}
