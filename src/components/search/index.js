import React from "react";
import './index.css';

export default ({handleInputChange, handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <input type='search' onChange={handleInputChange}/>
        <button type='submit'>search breeds</button>
    </form>
)
