import { useState } from 'react';
import './ImageGallery.css';

function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className="image-gallery">
      {/* Main Image Display */}
      <div className="main-image-container">
      <img 
        src={images[selectedImage].startsWith('http') ? images[selectedImage] : `/${images[selectedImage]}`}
        alt={`Property view ${selectedImage + 1}`}
        className="main-image"
      />
        
        {/* Navigation Arrows */}
        <button 
          className="nav-btn prev-btn" 
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          ‹
        </button>
        <button 
          className="nav-btn next-btn" 
          onClick={handleNext}
          aria-label="Next image"
        >
          ›
        </button>

        {/* Image Counter */}
        <div className="image-counter">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="thumbnails-container">
        <div className="thumbnails">
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img 
                src={image.startsWith('http') ? image : `/${image}`}
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;