import React from 'react';
import { Link } from "react-router-dom";

const API_KEY = "8ef796dbc4a449fa94f63b4a9128e729";

class Recipe extends React.Component {
    state = {
        recipe: {}
     }

    componentDidMount = async() => {
        const id = this.props.match.params.id;
        const req = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&`);

        const data = await req.json();
        this.setState({recipe: data});
        console.log(this.state.recipe);
    }
    render() {
        const recipe = this.state.recipe;
        return (
            <div className="container">
                <div className="active-recipe">
                    <img className="active-recipe__img" src={recipe.image} alt={recipe.title}/>
                    <h3 className="active-recipe__title">{recipe.title}</h3>
                    <h4 className="active-recipe__publisher">
                        Publisher: <span>{recipe.creditsText}</span>
                    </h4>
                    <button className="active-recipe__button">
                        <Link to="/">Go Home</Link>
                    </button>
                </div>
            </div>
        )
    }
}

export default Recipe;