import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"; 
import Navbar from './Navbar';
import './Category.css';

const Category = () => {
   
    const [meal, setmeal] = useState([])
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])    

  const fetchData = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      const data = await response.json()
      setmeal(data.categories)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="category-container">
        <h1>Meal Categories</h1>
        {loading ? (
          <div className="loading">Loading delicious categories...</div>
        ) : (
          <div className="category-grid">
            {meal && meal.map((item) => (
              <div key={item.idCategory} className="meal-card">
                <img src={item.strCategoryThumb} alt={item.strCategory} />
                <h2>{item.strCategory}</h2>
                <p>{item.strCategoryDescription}</p>
                <NavLink to="/Meal">
                  <button>
                    <span>See Recipes</span>
                  </button>
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Category