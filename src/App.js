import React, {useState} from "react";
import './scss/app.scss'
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="App">
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />}/>
            <Route path="/cart" element={<Cart />}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
