import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import './Recipe.css';

const Recipe = () => {

   const {mealid} = useParams();
   const [info, setInfo] = useState(null);
   const [loading, setLoading] = useState(true);

   const getInfo = async () => {
      setLoading(true);
      try {
         const get = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
         const jsonData = await get.json();
         setInfo(jsonData.meals[0]);
         setLoading(false);
      } catch (error) {
         console.error("Error fetching recipe:", error);
         setLoading(false);
      }
   }

   useEffect(() => {
      getInfo();
   }, [mealid]);

   return (
      <div className="recipe-container">
         {/* Go Back Button */}
         <NavLink to={"/Meal"} className="meal-detail-btn">
            <IoIosArrowBack className="btn-icon" />
            <span className="btn-text">Go Back</span>
         </NavLink>

         {loading ? (
            <div className="loading">Loading recipe details...</div>
         ) : !info ? (
            <div className="not-found">
               <h2>Recipe Not Found</h2>
               <p>Sorry, we couldn't find the recipe you're looking for.</p>
            </div>
         ) : (
            <div className='mealInfo'> 
               <img src={info.strMealThumb} alt={info.strMeal} />
               <div className='info'>
                  <h1>Recipe Detail</h1>
                  <button>{info.strMeal}</button>
                  
                  <div className="info-details">
                     <h3>Category: {info.strCategory}</h3>
                     <h3>Area: {info.strArea}</h3>
                  </div>

                  <div className="instructions-section">
                     <h3 className="instructions-title">Instructions</h3>
                     <p>{info.strInstructions}</p>
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default Recipe