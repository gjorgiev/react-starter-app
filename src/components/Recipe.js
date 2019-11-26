import React from 'react';

const API_KEY = process.env.REACT_APP_API_KEY_SPOONACULAR;

class Recipe extends React.Component {
    state = {
        recipe: {}
     }

    componentDidMount = async() => {
        const id = this.props.match.params.id;
        const json = localStorage.getItem(id);
        if (json === null){
            const req = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&`);
            const data = await req.json();
            this.setState({recipe: data});
        } else {
            const recipe = JSON.parse(json);
            this.setState({recipe});
        }
    }
    componentDidUpdate = () => {
        const id = this.props.match.params.id;
        const recipe = JSON.stringify(this.state.recipe);
        localStorage.setItem(id, recipe);
    }
    render() {
        const recipe = this.state.recipe;
        if (Object.keys(recipe).length !== 0){
            console.log(recipe);
            return (
                <div className="container">
                        <img className="img-fluid" src={recipe.image} alt={recipe.title}/>
                        <h3 className="active-recipe__title">{recipe.title}</h3>
                        <h5>Ingredients</h5>
                        <ul className="list-group">
                        {recipe.extendedIngredients.map((ingredient) => {
                            return (
                                <li key={ingredient.id} className="list-group-item">
                                    {ingredient.originalString}
                                </li>
                            );
                        })}
                        </ul>
                        <h5>Steps</h5>
                        <ol className="list-group">
                        {recipe.analyzedInstructions[0].steps.map((step) => {
                            return (
                                <li key={step.number} className="list-group-item">{step.step}</li>
                            );
                        })}
                        </ol>
                        <h4 className="active-recipe__publisher">
                            Publisher: <span>{recipe.creditsText}</span>
                        </h4>
                </div>
            )
        } else return null;
    }
}

export default Recipe;