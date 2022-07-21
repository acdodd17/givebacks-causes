import React, { useState, useEffect, useCallback, useMemo } from "react";

import logo from "./assets/logo.png";
import "./App.css";
import Search from "./components/Search";
import SingleCause from "./components/SingleCause";
import { get } from "./utils/http";

export interface ICause {
  uuid: string;
  name: string;
  city: string;
  state: string;
  address: string;
  details_url: string;
  join_url: string;
}

type Query = {
  name?: "";
  city?: "";
  // state?: "";
};

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [causes, setCauses] = useState<ICause[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [query, setQuery] = useState<Query>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await get(`/causes/search?${search}`);
      setCauses(data.causes);
      setIsLoaded(true);
    };

    fetchData();
  }, [search]);

  //useCallback
  const filterSearch = (e: React.FormEvent) => {
    e.preventDefault();

    let inputs = document.querySelectorAll("input");

    if (query.name) {
      setSearch(`search[name][value]=${query.name}`);
    } else if (query.city) {
      setSearch(`search[city][value]=${query?.city}`);
    // } else if (query.state) {
    //   setSearch(`search[state][value]=${query?.state}`);
    // } 
    }else if (query.name && query.city) {
      setSearch(
        `join=AND&search[name][value]=${query?.name}&search[city][value]=${query?.city}`
      );
      console.log(search);
    } else {
      return;
    }
   
    inputs.forEach((input) => (input.value = ""));
  };

  useEffect(() => {
    setQuery({
      name: "",
      city: "",
      // state: ""
    });
  }, [search])

  // const renderCauses = useMemo(() => {
  //   return causes.map((cause) => (
  //     <SingleCause cause={cause} key={cause.uuid} />
  //   ))
  // }, [causes])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Memberhub logo" />
        <h1 className="title">givebacks</h1>
        <p id="tagline">Empowering communities through everyday purchases</p>
      </header>
      <main>
        <div className="filter-search">
          <div className="search">
            <p id="search-instructions">
              Filter causes below. Search by name and/or location
            </p>
            <Search
              filterSearch={filterSearch}
              query={query}
              setQuery={setQuery}
            />
          </div>
        </div>
        {isLoaded === true && causes ? (
          <>
            <div className="cause-count">
              <h3 className="count">
                {causes.length} <em>causes showing</em>
              </h3>
            </div>
            <div className="causes">
              {causes.map((cause) => (
                <SingleCause cause={cause} key={cause.uuid} />
              ))}
            </div>
          </>
        ) : (
          <div>'Loading'</div>
        )}
      </main>
    </div>
  );
};

export default App;
