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
import { AuthenticationService } from "../Services/AuthenticationService";
import axios from "../Services/AxiosService";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const StyledNavbar = styled.nav`
overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  z-index: 100;
  background-color: #0b1f3d;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: white;
`;

const StyledLogo = styled.h3`
  margin-right: auto;
  padding-left: 30px;
  cursor: pointer;
`;

const StyledNavButton = styled.button`
  background-color: white;
`;

const StyledAutoComplete = styled(Autocomplete)`
  color: white;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 30px;
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
  const [stockSymbols, setStockSymbols] = useState<any[]>([]);
  const classes = useStyles();
  const history = useHistory();

  const handleSelectedStock = () => {
    if (inputValue) {
      setSelectedStockSymbol(inputValue);
      history.push("/stocks");
    }
    console.log("here");
  };

  const handleHomePageClick = () => {
    history.push("/");
  };

  const handleLogoutClick = () => {
    console.log("log out");
    axios.get("/auth/logout").then((res: any) => {
      console.log(res);
    });
    history.push("/login");
    // AuthenticationService.logoutUser().then((res) => {
    //   console.log("Attempting to log out");
    // });
  };

  const searchSymbol = useCallback(
    debounce((value: any) => {
      console.log(value);
      StockService.getStockSymbols(value).then((res) => {
        console.log(res.data.result);
        if (res.data.result) setStockSymbols(res.data.result);
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

  const setTheSelectedStock = (value: any) => {
    if(value) {
      setSelectedStockSymbol(value.symbol)
      history.push(`/stocks/${value.symbol}`);
    }
    
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography style={{ flex: 1, cursor: "pointer" }} onClick={handleHomePageClick}>
          Stocks App
        </Typography>
        <Autocomplete     
          freeSolo
          id="country-select-demo"
          style={{ width: 300, margin: "10px" }}
          options={stockSymbols}
          onChange={(e, value) => setTheSelectedStock(value)}
          onInputChange={(e, value) => searchSymbol(value)}
          size="small"
          placeholder="Search Symbol"
          // classes={{
          //   option: classes.option,
          // }}
          autoHighlight
          getOptionLabel={(option) => option.symbol}
          renderOption={(option) => (
        <div style={{display: "flex", alignItems: "center", width: "100%"}}>
          <div>{option.description}</div>
          <div style={{marginLeft: "auto", order: 2}}><b>{option.symbol}</b></div>
        </div>
      )}
      renderInput={(params) => (
        <TextField
        type="text"
        placeholder="Search Symbol"
        onFocus={(event) => event.target.setAttribute('autocomplete', 'off')}
          {...params}
          variant="outlined"
        />
      )}
    />
    <Button>Tools</Button>
    <Button onClick={handleLogoutClick}>
      Log out
    </Button>
      </Toolbar>
    </AppBar>
    // <StyledNavbar>
    //   <StyledLogo onClick={handleHomePageClick}>Stocks App</StyledLogo>
    //   {/* <TextField
    //     placeholder="Ticker Symbol"
    //     color="secondary"
    //     onChange={(e) => searchSymbol(e.target.value)}
    //     // onChange={(e) => setInputValue(e.target.value)}
    //   /> */}
    //   <Autocomplete
    //   // autoComplete={false}
    //   id="country-select-demo"
    //   style={{ width: 300 }}
    //   options={stockSymbols}
    //   onChange={(e, value) => setTheSelectedStock(value)}
    //   onInputChange={(e, value) => searchSymbol(value)}
    //   size="small"
    //   // classes={{
    //   //   option: classes.option,
    //   // }}
    //   autoHighlight
    //   getOptionLabel={(option) => option.symbol}
    //   renderOption={(option) => (
    //     <React.Fragment>
    //       <span>{option.description}</span>
    //       <span><b>{option.symbol}</b></span>
    //       {/* <span>{option.description}</span> */}
    //       {/* <span>{countryToFlag(option.code)}</span>
    //       {option.label} ({option.code}) +{option.phone} */}
    //     </React.Fragment>
    //   )}
    //   renderInput={(params) => (
    //     <TextField
    //     type="text"
    //     autoComplete="off"
    //       {...params}
    //       variant="outlined"
    //       inputProps={{
    //         ...params.inputProps,
    //         autoComplete: 'new-password', // disable autocomplete and autofill
    //       }}
    //     />
    //   )}
    // />
    //   <Button color="secondary" onClick={handleSelectedStock}>
    //     Go
    //   </Button>
    //   <StyledLink to="/tools" color="seconday">
    //     Tools
    //   </StyledLink>
    //   <StyledLink to="/watching">Watching</StyledLink>
    //   <Button onClick={handleLogoutClick} color="secondary">
    //     Log out
    //   </Button>
    // </StyledNavbar>
  );
}
