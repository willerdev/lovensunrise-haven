interface PropertyImagesProps {
  images: string[];
  currentImageIndex: number;
  onImageChange: (index: number) => void;
}

export const PropertyImages = ({ images, currentImageIndex, onImageChange }: PropertyImagesProps) => {
  return (
    <div className="relative h-72">
      <img
        src={images[currentImageIndex]}
        alt="Property"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onImageChange(index)}
            className={`w-2 h-2 rounded-full ${
              currentImageIndex === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};