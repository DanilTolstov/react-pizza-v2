import React from "react";
import './scss/app.scss';

import Header from "./components/Header";
import Home from "./pages/Home";

import {Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {

  return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
              <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFound />} />
              </Routes>
            <Home />
          </div>
        </div>
      </div>
  );
}

export default App;
