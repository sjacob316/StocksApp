import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { MainPage } from "./Components/Main";
import { StockInfo } from "./Components/StockInfo";
import { APICheck } from "./Services/AxiosService";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

function App() {
  const [selectedStockSymbol, setSelectedStockSymbol] = useState("");

  return (
    <div className="App">
      <APICheck />
      <BrowserRouter>
        <Navbar setSelectedStockSymbol={setSelectedStockSymbol} />
        <Route exact path="/">
          <MainPage />
        </Route>
        <Switch>
          <Route path="/stocks">
            <StockInfo
              selectedStockSymbol={selectedStockSymbol}
              setSelectedStockSymbol={setSelectedStockSymbol}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
