import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEY = "8ef796dbc4a449fa94f63b4a9128e729";

class App extends Component {
  state = {
     recipes: []
  }
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${recipeName}`);

    const data = await api_call.json();
    const recipes = data.results;
    // Fix url links for images (add baseUri in front)
    recipes.forEach(element => {
      element.image = data.baseUri + element.image;
    });
    this.setState({recipes});
  }
  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({recipes});
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Finder Recipes</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;