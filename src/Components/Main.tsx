import { Card, CardContent, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";
import { MainPageService } from "../Services/MainPageService";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Authorize } from "./Authorize";
import { AuthenticationService } from "../Services/AuthenticationService";
import { useGlobalContext } from "../Context";
import { useHistory } from "react-router-dom";
import { StockCard } from "./StockCard";
// import { Calendar, Badge } from 'antd';

const localizer = momentLocalizer(moment);

const StyledCarousel = styled(Carousel)`
  width: 500px;
  // margin: 0 auto;
`;

const StyledCalendarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledNewsContainer = styled.div`
  // padding-left: 250px;
`;

interface MainPageProps {
  selectedStockSymbol: string;
  setSelectedStockSymbol: (stockSymbol: string) => void;
}

export const MainPage = ({selectedStockSymbol, setSelectedStockSymbol}: MainPageProps) => {
  const history = useHistory();
  const [news, setNews] = useState([]);
  const [myEventsList, setMyEventsList] = useState([]);
  const [upcomingIPOs, setUpcomingIPOs] = useState([]);
  const [upcomingEarnings, setUpcomingEarnings] = useState([]);
  const { copy, setCopy } = useGlobalContext()

//   const socket = new WebSocket('wss://ws.finnhub.io?token=bu5sln748v6v0i9su740');

//   // Connection opened -> Subscribe
//   socket.addEventListener('open', function (event) {
//   socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//   });

//   // Listen for messages
// socket.addEventListener('message', function (event) {
//   console.log('Message from server ', event.data);
// });

// // Unsubscribe
// const unsubscribe = (symbol: string) => {
//   socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
// }


  useEffect(() => {
    AuthenticationService.verifyAuthentication().then((res: any) => {
      console.log(res.data);
    });

    MainPageService.getGeneralNews().then((res) => {
      setNews(res.data);
      // console.log(res);
    });

    MainPageService.getIpoCalendar(moment().startOf("month").format("yyyy-MM-DD"), moment().endOf("month").format("yyyy-MM-DD")).then((res) => {
      console.log(res);
      setUpcomingIPOs(res.data.ipoCalendar);
    });

    MainPageService.getEarningsCalendar().then((res) => {
      console.log(res.data.earningsCalendar);
      setUpcomingEarnings(res.data.earningsCalendar);
    });
  }, []);

  const loginWithGoogle = () => {
    AuthenticationService.loginWithGoogle().then((data: any) =>
      console.log(data)
    );
  };

  const handleCardClick = (inputValue: string) => {
      if (inputValue) {
        setSelectedStockSymbol(inputValue);
        history.push("/stocks");
      }
      console.log("here");
  }

  const handleRangeChange = (input: any) => {
    console.log(input);
    const startDate = moment(input.start).format("yyyy-MM-DD");
    const endDate = moment(input.end).format("yyyy-MM-DD");
    MainPageService.getIpoCalendar(startDate, endDate).then((res) => {
      console.log(res);
      setUpcomingIPOs(res.data.ipoCalendar);
    });
  }

  const handleCalendarEventClicked = (event: any) => {
    console.log(event)
    if(event.symbol) {
      setSelectedStockSymbol(event.symbol)
      history.push(`/stocks/${event.symbol}`);
    }
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Authorize />
      <div>
        <Typography>Stock Watchlist</Typography>
        <hr style={{borderTop: "2px solid #bbb", borderRadius: "5px"}}/>
        <div style={{ display: "flex", justifyContent: "space-between", height: "150px" }}>
          {copy.map((symbol) => (
            <StockCard stockSymbol={symbol}/>            
          ))}                  
        </div>
      </div>
      <StyledCalendarContainer>
        <div style={{ width: "100%" }}>
          <Typography>IPO Calendar</Typography>
          <hr style={{borderTop: "2px solid #bbb", borderRadius: "5px"}}/>
          <Calendar
          popup
            localizer={localizer}
            events={upcomingIPOs}
            onSelectEvent={(e) => handleCalendarEventClicked(e)}
            startAccessor="date"
            endAccessor="date"
            views={{
              month: true,
            }}
            onRangeChange={(input) => handleRangeChange(input)}
            style={{ height: 500, width: 500 }}
            titleAccessor="name"          
          />
          {/* <Calendar style={{width: "500px", height: "800px"}}/> */}
        </div>
        {/* <div style={{ marginRight: "10px" }}>
          <h4>Earnings Calendar</h4>
          <Calendar
            localizer={localizer}
            events={upcomingEarnings}
            startAccessor="date"
            endAccessor="date"
            views={{
              month: true,
            }}
            style={{ height: 500, width: 500 }}
            titleAccessor="symbol"
          />
        </div> */}
      </StyledCalendarContainer>

      <StyledNewsContainer>
        <Typography>Recent News</Typography>
        <hr style={{borderTop: "2px solid #bbb", borderRadius: "5px"}}/>
        {/* <div style={{ paddingLeft: "50px", paddingRight: "50px" }}> */}
        {/* TODO Set caption size so it doesn't move */}
        <StyledCarousel navButtonsAlwaysVisible interval={10000}>
          {news.map((res: any) => (
            <>
              <a href={res.url} target="_blank">
                <img src={res.image} width="500" height="300" />
                <div>{res.headline}</div>
              </a>
            </>
          ))}
        </StyledCarousel>
      </StyledNewsContainer>

      {/* </div> */}
      {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
        {news.map((res: any) => (
          <>
            <a href={res.url} target="_blank">
              <div>{res.headline}</div>
              <img src={res.image} width="300" height="200" />
            </a>
          </>
        ))}
      </div> */}
    </div>
  );
};
