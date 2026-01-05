import { useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import './FavouritesList.css';

function FavouritesList({ favourites, removeFromFavourites, clearFavourites }) {
  
  // Drop zone for adding properties to favourites
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'property',
    drop: (item) => {
      // Item already added in PropertyCard, just for visual feedback
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  // Format price
  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  return (
    <div 
      ref={drop}
      className={`favourites-list ${isOver ? 'drop-active' : ''}`}
    >
      <div className="favourites-header">
        <h3>My Favourites</h3>
        <span className="favourites-count">{favourites.length}</span>
      </div>

      {favourites.length === 0 ? (
        <div className="empty-favourites">
          <p>No favourites yet</p>
          <p className="hint">Drag properties here or click the heart icon</p>
        </div>
      ) : (
        <>
          <div className="favourites-items">
            {favourites.map((property) => (
              <FavouriteItem
                key={property.id}
                property={property}
                removeFromFavourites={removeFromFavourites}
                formatPrice={formatPrice}
              />
            ))}
          </div>

          <button 
            className="clear-favourites-btn"
            onClick={clearFavourites}
          >
            Clear All Favourites
          </button>
        </>
      )}
    </div>
  );
}

// Individual favourite item component with drag-out functionality
function FavouriteItem({ property, removeFromFavourites, formatPrice }) {
  
  // Drag out of favourites to remove
  const [{ isDragging }, drag] = useDrop(() => ({
    accept: 'favourite-item',
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const handleRemove = (e) => {
    e.preventDefault();
    removeFromFavourites(property.id);
  };

  return (
    <div 
      ref={drag}
      className={`favourite-item ${isDragging ? 'dragging-out' : ''}`}
    >
      <Link to={`/property/${property.id}`} className="favourite-link">
        <img src={property.picture.startsWith('http') ? property.picture : `/${property.picture}`} alt={property.location} />
        <div className="favourite-info">
          <div className="favourite-price">{formatPrice(property.price)}</div>
          <div className="favourite-location">{property.location}</div>
          <div className="favourite-meta">
            {property.bedrooms} bed • {property.type}
          </div>
        </div>
      </Link>
      
      <button 
        className="remove-favourite-btn"
        onClick={handleRemove}
        title="Remove from favourites"
      >
        ✕
      </button>
    </div>
  );
}

export default FavouritesList;