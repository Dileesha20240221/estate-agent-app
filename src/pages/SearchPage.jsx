import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import PropertyList from '../components/PropertyList';
import FavouritesList from '../components/FavouritesList';
import propertiesData from '../data/properties.json';
import './SearchPage.css';

function SearchPage({ favourites, addToFavourites, removeFromFavourites, clearFavourites }) {
  const [searchResults, setSearchResults] = useState(propertiesData.properties);
  const [hasSearched, setHasSearched] = useState(false);

  // Search function that filters properties based on criteria
  const handleSearch = (criteria) => {
    const { type, minPrice, maxPrice, minBedrooms, maxBedrooms, dateFrom, dateTo, postcode } = criteria;
    
    let filtered = propertiesData.properties;

    // Filter by type
    if (type && type !== 'any') {
      filtered = filtered.filter(prop => prop.type.toLowerCase() === type.toLowerCase());
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(prop => prop.price >= minPrice);
    }
    if (maxPrice) {
      filtered = filtered.filter(prop => prop.price <= maxPrice);
    }

    // Filter by bedroom range
    if (minBedrooms) {
      filtered = filtered.filter(prop => prop.bedrooms >= minBedrooms);
    }
    if (maxBedrooms) {
      filtered = filtered.filter(prop => prop.bedrooms <= maxBedrooms);
    }

    // Filter by date added
    if (dateFrom || dateTo) {
      filtered = filtered.filter(prop => {
        const propDate = new Date(prop.added.year, getMonthNumber(prop.added.month), prop.added.day);
        
        if (dateFrom && dateTo) {
          return propDate >= dateFrom && propDate <= dateTo;
        } else if (dateFrom) {
          return propDate >= dateFrom;
        } else if (dateTo) {
          return propDate <= dateTo;
        }
        return true;
      });
    }

    // Filter by postcode area
    if (postcode) {
      filtered = filtered.filter(prop => {
        const locationPostcode = prop.location.split(' ').pop(); // Get last part (postcode)
        return locationPostcode.startsWith(postcode.toUpperCase());
      });
    }

    setSearchResults(filtered);
    setHasSearched(true);
  };

  // Helper function to convert month name to number
  const getMonthNumber = (monthName) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return months[monthName] || 0;
  };

  return (
    <div className="search-page">
      <header className="page-header">
        <h1>Estate Agent Property Search</h1>
      </header>

      <div className="search-container">
        <div className="search-section">
          <SearchForm onSearch={handleSearch} />
          
          <div className="results-section">
            <h2>
              {hasSearched 
                ? `Search Results (${searchResults.length} ${searchResults.length === 1 ? 'property' : 'properties'} found)`
                : `All Properties (${searchResults.length})`
              }
            </h2>
            <PropertyList 
              properties={searchResults} 
              addToFavourites={addToFavourites}
              favourites={favourites}
            />
          </div>
        </div>

        <aside className="favourites-sidebar">
          <FavouritesList
            favourites={favourites}
            removeFromFavourites={removeFromFavourites}
            clearFavourites={clearFavourites}
          />
        </aside>
      </div>
    </div>
  );
}

export default SearchPage;