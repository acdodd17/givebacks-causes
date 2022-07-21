import React from 'react';

interface Props {
    filterSearch: (e: React.FormEvent) => void;
    query: object;
    setQuery: React.Dispatch<React.SetStateAction<object>>;
}
const Search: React.FC<Props> = ({filterSearch, query, setQuery}) => {

    return (
        <form className='search-form'  onSubmit={filterSearch}>
              <label><input type='text' name='name' placeholder='Enter name of cause' onChange={(e) => {setQuery({...query, name: `${e.target.value.toLowerCase()}`})}} /></label>
              <label><input type='text' name='city' placeholder='Location' onChange={(e) => {setQuery({...query, city: `${e.target.value.toLowerCase()}`})}}/>
              {/* <input type='text' name='state'placeholder='State' onChange={(e) => {setQuery({...query, state: `${e.target.value.toLowerCase()}`})}} /> */}
              </label>
              <button className='search-btn' type='submit'>Search</button>
            </form>
    );
};

export default Search; 