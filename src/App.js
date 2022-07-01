import React, { useState, useEffect } from 'react';

import logo from '../src/assets/logo.png';
import "./App.css";
import Cause from './components/Cause';
import {get} from './utils/http';

function App() {
  const data = get('/causes/search');
  const [search, setSearch] = useState('')
  const [causes, setCauses] = useState([{}]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
   
        data.then((data) => {
          setCauses(data.causes);
          setIsLoaded(true);
        })
}, []);

  const filterSearch = async(e) => {
    e.preventDefault();

    setSearch(query.toLowerCase());
    
    await get(`/causes/search?search[name][value]=${search}`)
    .then((data) => {
      setCauses(data.causes)
      e.target.value = '';
    });
   
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Memberhub logo" />
        <h1 className='title'>Givebacks</h1>
        <p id='tagline'>Empowering communities through everyday purchases</p>
      </header>
      <main>
        <div className='filter-search'>
          <div className='search'>
            <p id='search-instructions'>Filter causes below. Search by name, city, and/or state</p>
            <form className='search-form' onSubmit={filterSearch}>
              <label><input type='text' name='name' placeholder='Enter name of cause' onChange={(e) => setQuery(e.target.value)} /></label>
              <label><input type='text' name='city' placeholder='City'/><input type='text' name='state'placeholder='State'/></label>
              <button className='search-btn' type='submit'>Search</button>
            </form>
          </div>
          
        </div>
        {isLoaded === true && causes ? 
        <>
        <div className='cause-count'>
            <h3 className='count'>{causes.length} <em>causes showing</em></h3>
          </div>
          <div className='causes'>
            {causes.map((cause, index) => <Cause cause={cause} key={index}/> )}
          </div>
        </>
        : <div>'Loading'</div>} 
      </main>
    </div>
  );
}

export default App;
