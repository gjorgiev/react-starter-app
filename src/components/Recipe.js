import React from 'react';
import { Link } from "react-router-dom";

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
        return (
            <div className="container">
                    <img className="img-fluid" src={recipe.image} alt={recipe.title}/>
                    <h3 className="active-recipe__title">{recipe.title}</h3>
                    <h4 className="active-recipe__publisher">
                        Publisher: <span>{recipe.creditsText}</span>
                    </h4>
                    <button className="active-recipe__button">
                        <Link to="/">Go Home</Link>
                    </button>
            </div>
        )
    }
}

export default Recipe;