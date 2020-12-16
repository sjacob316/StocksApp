import { Card, CardContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";
import { MainPageService } from "../Services/MainPageService";

const StyledCarousel = styled(Carousel)`
  width: 500px;
`;

export const MainPage = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    console.log("main open");
    MainPageService.getGeneralNews().then((res) => {
      setNews(res.data);
      console.log(res);
    });
  }, []);

  return (
    <div style={{ height: "100px", width: "100%" }}>
      <h6>My Stock Watchlist</h6>
      <Card style={{ backgroundColor: "#314B70", width: "100px" }}>
        <CardContent>TTD</CardContent>
      </Card>
      <h6>Recent News</h6>
      {/* <div style={{ paddingLeft: "50px", paddingRight: "50px" }}> */}
      <StyledCarousel navButtonsAlwaysVisible>
        {news.map((res: any) => (
          <>
            <a href={res.url} target="_blank">
              <img src={res.image} width="500" height="300" />
              <div>{res.headline}</div>
            </a>
          </>
        ))}
      </StyledCarousel>
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
