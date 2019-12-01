import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEY = process.env.REACT_APP_API_KEY_SPOONACULAR;

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
    if (json !== null){
      const recipes = JSON.parse(json);
      this.setState({recipes});
    }
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">
            <a href="/">
              <img src={process.env.PUBLIC_URL + '/favicon.ico'} width="45" height="45" alt="finder.recipes logo" />
              finder.recies
            </a>
          </span>
          <Form getRecipe={this.getRecipe}/>
        </nav>
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;