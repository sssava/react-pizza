import React, {createContext, useState} from "react";
import './scss/app.scss'
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

export const SearchContext = createContext()

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="App">
      <div className="wrapper">
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/cart" element={<Cart />}/>
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
