import React from "react";
import './scss/app.scss'
import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/cart" element={<Cart />}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
