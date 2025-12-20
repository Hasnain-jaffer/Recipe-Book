import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import "./Meal.css";

const Meal = () => {
  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getMealData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      const result = await response.json();
      console.log("API Result:", result);
      setData(result.meals || []); // ✅ handle null case
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meal data:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setsearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getMealData();
    }
  };

  useEffect(() => {
    getMealData();
  }, []);

  return (
    <>
      <div className="meal-container">
        <h1>Meal Details</h1>

        <div className="search-section">
          <input 
            className="input" 
            type="text" 
            value={search} 
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Search Meal"
          />
          <button onClick={getMealData}>
            <span>Search</span>
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading delicious meals...</div>
        ) : data && data.length > 0 ? (
          <div className="meals-grid">
            {data.map((meal) => (
              <div key={meal.idMeal} className="meal-card">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
                <h2>{meal.strMeal}</h2>
                <NavLink to={`/recipe/${meal.idMeal}`}>
                  <button>
                    <span>Read more</span>
                  </button>
                </NavLink>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <h2>No meals found</h2>
            <p>Try searching for something else!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Meal;