import { Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";
import { MainPageService } from "../Services/MainPageService";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Authorize } from "./Authorize";
import { AuthenticationService } from "../Services/AuthenticationService";
const localizer = momentLocalizer(moment);

const StyledCarousel = styled(Carousel)`
  width: 500px;
  // margin: 0 auto;
`;

const StyledCalendarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 250px;
`;

const StyledNewsContainer = styled.div`
  padding-left: 250px;
`;

export const MainPage = () => {
  const [news, setNews] = useState([]);
  const [myEventsList, setMyEventsList] = useState([]);
  const [upcomingIPOs, setUpcomingIPOs] = useState([]);
  const [upcomingEarnings, setUpcomingEarnings] = useState([]);

  useEffect(() => {
    AuthenticationService.verifyAuthentication().then((res: any) => {
      console.log(res.data);
    });

    MainPageService.getGeneralNews().then((res) => {
      setNews(res.data);
      console.log(res);
    });

    MainPageService.getIpoCalendar().then((res) => {
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

  return (
    <div style={{ height: "100px", width: "100%" }}>
      <Authorize />
      <div style={{ paddingLeft: "250px" }}>
        <h4>My Stock Watchlist</h4>
        <div style={{ display: "flex", height: "150px" }}>
          <Card
            variant="outlined"
            style={{
              backgroundColor: "#314B70",
              height: "150px",
              width: "125px",
              margin: "5px",
            }}
          >
            <CardContent>
              <b>TTD</b>
            </CardContent>
          </Card>
          <Card
            variant="elevation"
            style={{
              backgroundColor: "#314B70",
              height: "150px",
              width: "125px",
              margin: "5px",
            }}
          >
            <CardContent>
              <b>TTD</b>
            </CardContent>
          </Card>
          <Card
            style={{
              backgroundColor: "#314B70",
              height: "150px",
              width: "125px",
              margin: "5px",
            }}
          >
            <CardContent>
              <b>TTD</b>
            </CardContent>
          </Card>
          <Card
            style={{
              backgroundColor: "#314B70",
              height: "150px",
              width: "125px",
              margin: "5px",
            }}
          >
            <CardContent>
              <b>TTD</b>
              230.73
            </CardContent>
          </Card>
        </div>
      </div>
      <StyledCalendarContainer>
        <div style={{ marginRight: "10px" }}>
          <h4>IPO Calendar</h4>
          <Calendar
            localizer={localizer}
            events={upcomingIPOs}
            startAccessor="date"
            endAccessor="date"
            views={{
              month: true,
            }}
            style={{ height: 500, width: 500 }}
            titleAccessor="name"
          />
        </div>
        <div style={{ marginRight: "10px" }}>
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
          />
        </div>
      </StyledCalendarContainer>

      <StyledNewsContainer>
        <h4>Recent News</h4>
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
