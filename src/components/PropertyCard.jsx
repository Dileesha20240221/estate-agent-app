// Security: React JSX automatically encodes all text content to prevent XSS attacks
// All user input and dynamic content is sanitized before rendering
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import './PropertyCard.css';

function PropertyCard({ property, addToFavourites, isFavourite }) {
  
  // Drag and drop configuration
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'property',
    item: { property },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  // Format price with commas
  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  // Truncate description
  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Handle favourite button click
  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToFavourites(property);
  };

  return (
    <div 
      ref={drag}
      className={`property-card ${isDragging ? 'dragging' : ''}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="property-image">
        <img src={property.picture.startsWith('http') ? property.picture : `/${property.picture}`} alt={property.location} />
        <button 
          className={`favourite-btn ${isFavourite ? 'active' : ''}`}
          onClick={handleFavouriteClick}
          title={isFavourite ? 'Already in favourites' : 'Add to favourites'}
        >
          <span className="heart-icon">{isFavourite ? '❤️' : '🤍'}</span>
        </button>
      </div>

      <div className="property-details">
        <div className="property-price">{formatPrice(property.price)}</div>
        
        <div className="property-info">
          <span className="property-type">{property.type}</span>
          <span className="property-bedrooms">{property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''}</span>
        </div>

        <div className="property-location">{property.location}</div>

        <div className="property-description">
          {truncateDescription(property.description)}
        </div>

        <Link to={`/property/${property.id}`} className="view-details-btn">
          View Full Details
        </Link>

        <div className="drag-hint">
          <span>Drag to favourites →</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;