import { useParams, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ImageGallery from '../components/ImageGallery';
import propertiesData from '../data/properties.json';
import './PropertyDetail.css';

function PropertyDetail({ favourites, addToFavourites }) {
  const { id } = useParams();
  
  // Find the property by id
  const property = propertiesData.properties.find(p => p.id === id);

  // Check if property is in favourites
  const isFavourite = favourites.some(fav => fav.id === property?.id);

  // If property not found
  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property Not Found</h2>
        <Link to="/" className="back-link">← Back to Search</Link>
      </div>
    );
  }

  // Format price
  const formatPrice = (price) => {
    return '£' + price.toLocaleString();
  };

  // Handle add to favourites
  const handleAddToFavourites = () => {
    addToFavourites(property);
  };

  // Get Google Maps embed URL
  const getMapUrl = () => {
    const address = encodeURIComponent(property.location);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${address}`;
  };

  return (
    <div className="property-detail">
      <div className="detail-header">
        <Link to="/" className="back-link">← Back to Search</Link>
      </div>

      <div className="property-main">
        <div className="property-header-info">
          <h1>{formatPrice(property.price)}</h1>
          <p className="property-address">{property.location}</p>
          <div className="property-features">
            <span className="feature">{property.type}</span>
            <span className="feature">{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
            <span className="feature">{property.tenure}</span>
          </div>
          <button 
            className={`favourite-btn-large ${isFavourite ? 'active' : ''}`}
            onClick={handleAddToFavourites}
          >
            {isFavourite ? '❤️ Saved to Favourites' : '🤍 Add to Favourites'}
          </button>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={property.images} />

        {/* Tabs for Description, Floor Plan, and Map */}
        <Tabs className="property-tabs">
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Location Map</Tab>
          </TabList>

          <TabPanel>
            <div className="tab-content">
              <h2>Property Description</h2>
              <p className="full-description">{property.description}</p>
              
              <div className="property-details-grid">
                <div className="detail-item">
                  <strong>Property Type:</strong>
                  <span>{property.type}</span>
                </div>
                <div className="detail-item">
                  <strong>Bedrooms:</strong>
                  <span>{property.bedrooms}</span>
                </div>
                <div className="detail-item">
                  <strong>Price:</strong>
                  <span>{formatPrice(property.price)}</span>
                </div>
                <div className="detail-item">
                  <strong>Tenure:</strong>
                  <span>{property.tenure}</span>
                </div>
                <div className="detail-item">
                  <strong>Date Added:</strong>
                  <span>{property.added.day} {property.added.month} {property.added.year}</span>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <h2>Floor Plan</h2>
              <div className="floor-plan-container">
                <img 
                  src={property.floorPlan} 
                  alt="Floor plan"
                  className="floor-plan-image"
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="tab-content">
              <h2>Location</h2>
              <div className="map-container">
                <iframe
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}`}
                  title="Property Location"
                ></iframe>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default PropertyDetail;