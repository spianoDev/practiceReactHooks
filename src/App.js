import React, {Component, useState} from "react";
import axios from 'axios'
import User from './Components/User'
import "./App.css";

function App() {
    const [search, setSearch] = useState("");
    const[user, setUser] = useState(null);

    const searchGitHub = async () => {
  if (search === '') return;
  // this will make everything that happens after the search wait until the search is done.
  const res = await axios.get(`https://api.github.com/users/${search}`);
  setUser(res.data);

};

    return(
        <div>
            <p>User: {search}</p>
            <input onChange={e => setSearch(e.target.value)} placeholder="Github Username"/>
            <button onClick={searchGitHub}>Search</button>
            {/*this adds a conditional */}
            {user && <User user = {user}/>}

        </div>
    )
}
export default App;
