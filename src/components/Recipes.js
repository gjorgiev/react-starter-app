import React from 'react';

const Recipes = props => (
    <div className="container">
        <div className="row">
        { props.recipes.map((recipe) => {
          return (
              <div key={recipe.id} className="col-md-4" style={{marginBottom: "2rem"}}>
                  <div className="recipe__box">
                      <img 
                        className="recipe__box-img" 
                        src={props.baseUri + recipe.image} 
                        alt={recipe.title}/>
                        <div className="recipe__text">
                            <h5>{recipe.title}</h5>
                            <p className="recipes__subtitle">
                                Ready In: <span>{ recipe.readyInMinutes } mins</span>
                            </p>
                        </div>
                    </div>
              </div>
          );
        })}
        </div>
    </div>
);

export default Recipes;