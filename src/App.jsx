/**
 * Main Application Component
 * Manages routing and global state for the Estate Agent application
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchPage from './pages/SearchPage';
import PropertyDetail from './pages/PropertyDetail';
import './App.css';

function App() {
    /**
   * Global state management for favourites list
   * Stores array of property objects that user has added to favourites
   */
  const [favourites, setFavourites] = useState([]);

  // Add to favourites (prevent duplicates)
  const addToFavourites = (property) => {
    setFavourites((prev) => {
      if (prev.find((fav) => fav.id === property.id)) {
        return prev; // Already exists
      }
      return [...prev, property];
    });
  };

  // Remove from favourites
  const removeFromFavourites = (propertyId) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId));
  };

  // Clear all favourites
  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <SearchPage
                  favourites={favourites}
                  addToFavourites={addToFavourites}
                  removeFromFavourites={removeFromFavourites}
                  clearFavourites={clearFavourites}
                />
              }
            />
            <Route
              path="/property/:id"
              element={
                <PropertyDetail
                  favourites={favourites}
                  addToFavourites={addToFavourites}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;