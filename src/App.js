import React, { useState, useEffect } from 'react';

import logo from '../src/assets/logo.png';
import "./App.css";
import Search from './components/Search'
import Cause from './components/Cause';
import {get} from './utils/http';

function App() {
  const [search, setSearch] = useState('')
  const [causes, setCauses] = useState([{}]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState({
    name: '',
    city: '',
    // state: ''
  });
  const [name, setName] = useState(false);
  const [city, setCity] = useState(false);
  // const [state, setState] = useState(false);

  useEffect(() => {

   const fetchData = async () => {
    const data = await get(`/causes/search?${search}`);
    setCauses(data.causes);
    setIsLoaded(true);
   };
   
   fetchData();

  }, [search]); 

  const filterSearch = (e) => {
    e.preventDefault();

    let inputs = document.querySelectorAll('input');
    
    try {
      if (name && !city) {
        setSearch(`search[name][value]=${query.name}`);
      } else if (city && !name) {
        setSearch(`search[city][value]=${query.city}`);
      // } else if (state && !name && !city) {
      //   setSearch(`search[state][value]=${query.state}`);
      } else if (name && city) {
        setSearch(`join=AND&search[name][value]=${query.name}&search[city][value]=${query.city}`);
      } else {
        return
      }
    } catch (err) {
      console.log(err);
    }

    setQuery({
      name:'', 
      city: '', 
      // state: ''
    });
    
    inputs.forEach(input => input.value = '');

  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Memberhub logo" />
        <h1 className='title'>givebacks</h1>
        <p id='tagline'>Empowering communities through everyday purchases</p>
      </header>
      <main>
        <div className='filter-search'>
          <div className='search'>
            <p id='search-instructions'>Filter causes below. Search by name and/or location</p>
            <Search filterSearch={filterSearch} query={query} setQuery={setQuery} setName={setName} setCity={setCity}  />
          </div>
          
        </div>
        {isLoaded === true && causes ? 
        <>
        <div className='cause-count'>
            <h3 className='count'>{causes.length} <em>causes showing</em></h3>
          </div>
          <div className='causes'>
            {causes.map((cause) => <Cause cause={cause} key={cause.uuid}/> )}
          </div>
        </>
        : <div>'Loading'</div>} 
      </main>
    </div>
  );
}

export default App;
