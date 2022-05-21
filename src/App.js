import React from "react";
import './scss/app.scss';
import Header from "./components/Header";
import {Categories} from "./components";

function App() {

  const [items, setItems] = React.useState([]);

  return (
      <Header />
  );
}

export default App;
