interface PropertyImagesProps {
  images: string[];
  currentImageIndex: number;
  onImageChange: (index: number) => void;
}

export const PropertyImages = ({ 
  images, 
  currentImageIndex, 
  onImageChange 
}: PropertyImagesProps) => {
  return (
    <div className="space-y-4">
      <div className="relative h-72">
        <img
          src={images[currentImageIndex]}
          alt="Property"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageChange(index)}
            className={`flex-shrink-0 relative ${
              currentImageIndex === index 
                ? "ring-2 ring-primary" 
                : "hover:opacity-80"
            }`}
          >
            <img
              src={image}
              alt={`Property ${index + 1}`}
              className="w-20 h-20 object-cover rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
};