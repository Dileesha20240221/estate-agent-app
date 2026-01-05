import PropertyCard from './PropertyCard';
import './PropertyList.css';

function PropertyList({ properties, addToFavourites, favourites }) {
  
  if (properties.length === 0) {
    return (
      <div className="no-results">
        <p>No properties found matching your search criteria.</p>
        <p>Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="property-list">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          addToFavourites={addToFavourites}
          isFavourite={favourites.some(fav => fav.id === property.id)}
        />
      ))}
    </div>
  );
}

export default PropertyList;