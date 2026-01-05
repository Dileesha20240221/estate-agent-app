import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  // Form state
  const [type, setType] = useState(null);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState(null);
  const [maxBedrooms, setMaxBedrooms] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [postcode, setPostcode] = useState('');

  // Options for React Select widgets
  const typeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' }
  ];

  const bedroomOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5+' }
  ];

  const priceOptions = [
    { value: 0, label: 'No min' },
    { value: 200000, label: '£200,000' },
    { value: 300000, label: '£300,000' },
    { value: 400000, label: '£400,000' },
    { value: 500000, label: '£500,000' },
    { value: 750000, label: '£750,000' },
    { value: 1000000, label: '£1,000,000' }
  ];

  const maxPriceOptions = [
    { value: 999999999, label: 'No max' },
    { value: 300000, label: '£300,000' },
    { value: 400000, label: '£400,000' },
    { value: 500000, label: '£500,000' },
    { value: 750000, label: '£750,000' },
    { value: 1000000, label: '£1,000,000' },
    { value: 1500000, label: '£1,500,000' }
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const searchCriteria = {
      type: type?.value,
      minPrice: minPrice?.value || 0,
      maxPrice: maxPrice?.value || 999999999,
      minBedrooms: minBedrooms?.value,
      maxBedrooms: maxBedrooms?.value,
      dateFrom,
      dateTo,
      postcode: postcode.trim()
    };

    onSearch(searchCriteria);
  };

  // Reset form
  const handleReset = () => {
    setType(null);
    setMinPrice('');
    setMaxPrice('');
    setMinBedrooms(null);
    setMaxBedrooms(null);
    setDateFrom(null);
    setDateTo(null);
    setPostcode('');
    
    // Reset search to show all properties
    onSearch({
      type: null,
      minPrice: 0,
      maxPrice: 999999999,
      minBedrooms: null,
      maxBedrooms: null,
      dateFrom: null,
      dateTo: null,
      postcode: ''
    });
  };

  return (
    <div className="search-form-container">
      <h2>Search Properties</h2>
      <form onSubmit={handleSubmit} className="search-form">
        
        {/* Property Type */}
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <Select
            id="type"
            options={typeOptions}
            value={type}
            onChange={setType}
            placeholder="Select type..."
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Price Range */}
        <div className="form-group">
          <label>Price Range</label>
          <div className="range-inputs">
            <Select
              options={priceOptions}
              value={minPrice}
              onChange={setMinPrice}
              placeholder="Min price"
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
            />
            <span className="range-separator">to</span>
            <Select
              options={maxPriceOptions}
              value={maxPrice}
              onChange={setMaxPrice}
              placeholder="Max price"
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {/* Bedrooms Range */}
        <div className="form-group">
          <label>Bedrooms</label>
          <div className="range-inputs">
            <Select
              options={bedroomOptions}
              value={minBedrooms}
              onChange={setMinBedrooms}
              placeholder="Min beds"
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
            />
            <span className="range-separator">to</span>
            <Select
              options={bedroomOptions}
              value={maxBedrooms}
              onChange={setMaxBedrooms}
              placeholder="Max beds"
              isClearable
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        {/* Date Added */}
        <div className="form-group">
          <label>Date Added</label>
          <div className="range-inputs">
            <DatePicker
              selected={dateFrom}
              onChange={(date) => setDateFrom(date)}
              placeholderText="From date"
              dateFormat="dd/MM/yyyy"
              isClearable
              className="date-picker"
            />
            <span className="range-separator">to</span>
            <DatePicker
              selected={dateTo}
              onChange={(date) => setDateTo(date)}
              placeholderText="To date"
              dateFormat="dd/MM/yyyy"
              isClearable
              className="date-picker"
            />
          </div>
        </div>

        {/* Postcode Area */}
        <div className="form-group">
          <label htmlFor="postcode">Postcode Area</label>
          <input
            type="text"
            id="postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="e.g., BR1, NW1"
            className="postcode-input"
          />
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button type="submit" className="btn btn-search">
            Search
          </button>
          <button type="button" onClick={handleReset} className="btn btn-reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;