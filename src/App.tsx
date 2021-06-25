import React, { useContext, useState } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { MainPage } from "./Components/Main";
import { StockInfo } from "./Components/StockInfo";
import { APICheck } from "./Services/AxiosService";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { PatternRecognition } from "./Components/Tools/PatternRecognition";
import { UserContext } from './Context';
import styled from "styled-components";

const StyledContentContainer = styled.div`
  overflow: auto;
  height: 90%;
  margin: 0 200px;
`
function App() {
  const [selectedStockSymbol, setSelectedStockSymbol] = useState(""); 
  const [copy, setCopy] = useState<string[]>([])
  return (
    <div className="App">
      <APICheck />
      <BrowserRouter>
      <UserContext.Provider value={{copy, setCopy}}>
      <Navbar setSelectedStockSymbol={setSelectedStockSymbol} />
        <StyledContentContainer>
        <Switch>
          <Route exact path="/">
            <MainPage 
            selectedStockSymbol={selectedStockSymbol}
            setSelectedStockSymbol={setSelectedStockSymbol}/>
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
        </StyledContentContainer>
      </UserContext.Provider>        
      </BrowserRouter>
    </div>
  );
}

export default App;
