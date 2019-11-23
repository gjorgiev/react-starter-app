import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEY = "8ef796dbc4a449fa94f63b4a9128e729";

class App extends Component {
  state = {
     recipes: [],
     baseUri: ''
  }
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=${recipeName}`);

    const data = await api_call.json();
    this.setState({recipes: data.results});
    this.setState({baseUri: data.baseUri});
    console.log(this.state.recipes);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes} baseUri={this.state.baseUri}/>
      </div>
    );
  }
}

export default App;