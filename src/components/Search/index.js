import React from 'react';

const Search = ({filterSearch, query, setQuery, setName, setCity, setState}) => {

    return (
        <form className='search-form'  onSubmit={filterSearch}>
              <label><input type='text' name='name' placeholder='Enter name of cause' onChange={(e) => {setQuery({...query, name: `${e.target.value.toLowerCase()}`}); setName(true);}} /></label>
              <label><input type='text' name='city' placeholder='Location' onChange={(e) => {setQuery({...query, city: `${e.target.value.toLowerCase()}`}); setCity(true)}}/>
              {/* <input type='text' name='state'placeholder='State' onChange={(e) => {setQuery({...query, state: `${e.target.value.toLowerCase()}`}); setState(true)}} /> */}
              </label>
              <button className='search-btn' type='submit'>Search</button>
            </form>
    );
};

export default Search; 