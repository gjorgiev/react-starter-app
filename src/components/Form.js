import React from 'react';

const Form = props => (
    <form className="form-inline my-2 my-lg-0" onSubmit={props.getRecipe}>
        <input className="form-control mr-sm-2" placeholder="Search" type="search" name="recipeName" aria-label="Search"/>
        <button className="btn btn-outline-success my-2 my-sm-0">Find</button>
    </form>
);

export default Form;