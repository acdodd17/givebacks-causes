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
        <p id='tagline'><em>Empowering communities through everyday purchases</em></p>
      </header>
      <main>
        <div className='filter-search'>

        </div>
        <div className='causes'>
          {isLoaded ? causes.map((cause, index) => <Cause cause={cause} key={index}/> ) : ''}
        </div>
      </main>
    </div>
  );
}

export default App;
