import React, { useCallback, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import { StockService } from "../Services/StockService";
import debounce from "lodash.debounce";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
const axios = require("axios");

const StyledNavbar = styled.nav`
  background-color: #0b1f3d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const StyledNavButton = styled.button`
  background-color: white;
`;

const StyledAutoComplete = styled(Autocomplete)`
  color: white;
`;
const useStyles = makeStyles((theme) => ({
  inputRoot: {
    width: "350px",
    color: "white",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
}));

interface NavbarPropsInterface {
  setSelectedStockSymbol: (symbol: string) => void;
}

export function Navbar({ setSelectedStockSymbol }: NavbarPropsInterface) {
  const [inputValue, setInputValue] = useState("");
  const [stockSymbols, setStockSymbols] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  const handleSelectedStock = () => {
    setSelectedStockSymbol(inputValue);
    history.push("/stocks");
    console.log("here");
  };

  const searchSymbol = useCallback(
    debounce((value: any) => {
      console.log(value);
      StockService.getStockSymbols(value).then((res) => {
        console.log(res.data);
        if (res.data.bestMatches) setStockSymbols(res.data.bestMatches);
      });
    }, 800),
    []
  );

  const getSymbols = (value: string) => {
    StockService.getStockSymbols(value).then((res) => {
      console.log(res.data);
      if (res.data.bestMatches) setStockSymbols(res.data.bestMatches);
    });
  };

  return (
    <StyledNavbar>
      <h6>Stocks App</h6>
      <TextField
        placeholder="Ticker Symbol"
        color="secondary"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button color="secondary" onClick={handleSelectedStock}>
        Go
      </Button>
      <Link to="/trending" color="secondary">
        Trending
      </Link>
      <Link to="/tools" color="seconday">
        Tools
      </Link>
      <Link to="/Watching" color="secondary">
        Watching
      </Link>
      <Link to="/" color="secondary">
        Log out
      </Link>
    </StyledNavbar>
  );
}
