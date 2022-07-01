import React, { useState, useEffect } from 'react';

import logo from '../src/assets/logo.png';
import "./App.css";
import Cause from './components/Cause';
import {get} from './utils/http';

function App() {
  const [path, setPath] = useState('');
  const [causes, setCauses] = useState([{}]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPath('/causes/search');
    const getData = async () => {
        await get(path)
        .then((data) => {
          setCauses(data.causes);
          setIsLoaded(true);
        })
    }
   getData();
}, [causes, path]);

  

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
            <form className='search-form'>
              <label><input type='text' placeholder='Enter name of cause'></input></label>
              <label><input type='text' placeholder='City'></input><input type='text' placeholder='State'></input></label>
              <button className='search-btn' type='submit'>Search</button>
            </form>
          </div>
          
        </div>
        {isLoaded === true && causes ? 
        <>
        <div className='cause-count'>
            <h3 className='count'>{causes.length} / 50 <em>causes</em></h3>
          </div>
          <div className='causes'>
            {causes.map((cause, index) => <Cause cause={cause} key={index}/> )}
          </div>
        </>
        : ''} 
      </main>
    </div>
  );
}

export default App;
