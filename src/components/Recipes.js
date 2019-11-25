import React from 'react';

import { Link } from "react-router-dom";

const Recipes = props => (
    <div className="container">
        <div className="row">
        { props.recipes.map((recipe) => {
          return (
              <div key={recipe.id} className="col-md-4" style={{marginBottom: "2rem"}}>
                  <div className="recipes__box">
                      <img 
                        className="img-fluid"
                        src={recipe.image} 
                        alt={recipe.title}/>
                        <div className="recipe__text">
                            <h5 className="recipes__title">{recipe.title}</h5>
                            <p className="recipes__subtitle">
                                Ready In: <span>{ recipe.readyInMinutes } mins</span>
                            </p>
                        </div>
                        <button className="recipe_buttons">
                            <Link to={{ pathname: `/recipe/${recipe.id}`}}>View Recipe</Link></button>
                    </div>
              </div>
          );
        })}
        </div>
    </div>
);

export default Recipes;