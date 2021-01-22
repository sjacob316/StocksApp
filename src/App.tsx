import React, { useState } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { MainPage } from "./Components/Main";
import { StockInfo } from "./Components/StockInfo";
import { APICheck } from "./Services/AxiosService";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { PatternRecognition } from "./Components/Tools/PatternRecognition";

function App() {
  const [selectedStockSymbol, setSelectedStockSymbol] = useState("");

  return (
    <div className="App">
      <APICheck />
      <BrowserRouter>
        <Navbar setSelectedStockSymbol={setSelectedStockSymbol} />
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/stocks">
            <StockInfo
              selectedStockSymbol={selectedStockSymbol}
              setSelectedStockSymbol={setSelectedStockSymbol}
            />
          </Route>
          <Route path="/pattern-recognition">
            <PatternRecognition />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
