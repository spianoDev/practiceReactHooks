import React, {useEffect, useState} from "react";
import './App.css';
import axios from 'axios';
import Spinner from './components/spinner';
import DogImage from './components/dog-image';
import Search from './components/search';

function App() {
    const [dog, setDog] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchRandomDog()
    }, []);

    const fetchRandomDog = () => {
        axios.get('https://dog.ceo/api/breeds/image/random')
            .then(response => setDog(response.data))
            .catch(err => console.log(err))
    };
    const handleInputChange = (e) => {

        const { value } = e.target;
        setSearch(value);
        console.log('Changing...');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDog(null);
        axios.get(`https://dog.ceo/api/breed/${search}/images/random`)
            .then(response => setDog(response.data))
            .catch(err => console.log(err))
    };
    return (
        <div className="App">
            <header className='App-header'>
                <label>Searching: {search}</label>
                <Search
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
            {dog ? <DogImage image={dog.message} /> :  <Spinner/>}
            </header>

        </div>
    );

}
export default App;
