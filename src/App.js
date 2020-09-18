import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios'

const BASEURL = "https://api.giphy.com/v1/gifs/search?q=";
const APIKEY = "&api_key=dc6zaTOxFJmzC&limit=20";

function App() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('kittens')

// use effect takes in a function
    useEffect(() => {
        searchGify(query)
    }, [query]); // an empty array will ask this to run only once
    // if you ever want to rerun your method, you set the query inside the array
// you cannot put asynchronous code inside the use effect function

    const searchGify = query => {
        console.log('Searching Giffy...');
        axios(`${BASEURL}${query}${APIKEY}`)
            .then(response => setResults(response.data.data))
            .catch(err=> console.log(err))
    };

  return (
    <div className="App">
        <input onChange={e => setQuery(e.target.value)} />
        <br/>
      {results.map(result => <img src={result.images.original.url} key={result.id}/>)}
    </div>
  );
}

export default App;
