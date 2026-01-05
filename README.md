# Estate Agent Web Application

A fully responsive single-page application (SPA) for searching and viewing property listings, built with React and Vite.

## Features

### Core Functionality
- **Advanced Property Search**: Filter properties by type, price range, bedrooms, date added, and postcode area
- **Search Results Display**: View properties with images, descriptions, and pricing in a responsive grid layout
- **Property Detail Pages**: Full property information with image gallery, tabs for description/floor plan/map
- **Favourites System**: Add/remove properties via drag-and-drop or button click, with duplicate prevention
- **Responsive Design**: Optimized layouts for desktop and mobile devices using CSS Grid, Flexbox, and media queries

### Technical Implementation
- **React Components**: Modular component structure with hooks (useState, useEffect)
- **React Router**: Client-side routing for seamless navigation
- **React Widgets**: Enhanced UI with react-select, react-datepicker, and react-tabs
- **Drag and Drop**: Implemented using react-dnd for favourites functionality
- **React Testing**: Comprehensive test suite using Jest and React Testing Library

### Security
- **Content Security Policy (CSP)**: Implemented to prevent XSS attacks
- **HTML Encoding**: React JSX automatically sanitizes all dynamic content

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
estate-agent-app/
├── public/
│   └── images/          # Property images
├── src/
│   ├── components/      # Reusable React components
│   │   ├── SearchForm.jsx
│   │   ├── PropertyList.jsx
│   │   ├── PropertyCard.jsx
│   │   ├── FavouritesList.jsx
│   │   └── ImageGallery.jsx
│   ├── pages/          # Page components
│   │   ├── SearchPage.jsx
│   │   └── PropertyDetail.jsx
│   ├── data/           # JSON data
│   │   └── properties.json
│   ├── __tests__/      # Jest tests
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── package.json
└── vite.config.js
```

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **React DnD**: Drag and drop functionality
- **React Select**: Enhanced dropdown menus
- **React DatePicker**: Date selection widget
- **React Tabs**: Tabbed interface for property details
- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities

## Search Functionality

The search supports multiple criteria that can be used individually or in combination:

1. **Property Type**: House, Flat, or Any
2. **Price Range**: Min and max price filters
3. **Bedrooms**: Min and max bedroom count
4. **Date Added**: Filter by date range
5. **Postcode Area**: Search by first part of postcode (e.g., BR5, NW1)

## Responsive Design

- **Desktop**: Three-column layout with search form, results, and favourites sidebar
- **Tablet**: Two-column layout
- **Mobile**: Single-column stacked layout with optimized touch targets

Media queries implemented for breakpoints:
- Large screens: > 1024px
- Tablets: 769px - 1024px  
- Mobile: < 768px

## Testing

The application includes comprehensive tests covering:
- Component rendering and UI elements
- User interactions and event handling
- Search filtering logic
- Favourites management
- Form validation

Run tests with: `npm test`

## Security Measures

1. **Content Security Policy**: Restricts resource loading to trusted sources
2. **JSX Encoding**: Automatic HTML encoding prevents XSS attacks
3. **Input Validation**: All user inputs are validated before processing

## Author

Student ID: [20240221]  
Module: 5COSC026W Advanced Client-Side Web Development  
University of Westminster

## License

This project is submitted as coursework for academic purposes.