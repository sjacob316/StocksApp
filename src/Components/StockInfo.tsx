import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { StockService } from "../Services/StockService";
import { Line } from "react-chartjs-2";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";
const axios = require("axios");

const StyledCarousel = styled(Carousel)`
  width: 500px;
`;

interface StockInfoInterface {
  selectedStockSymbol: string;
  setSelectedStockSymbol: (stockSymbol: string) => void;
}

export function StockInfo({
  selectedStockSymbol,
  setSelectedStockSymbol,
}: StockInfoInterface) {
  const [relatedStocks, setRelatedStocks] = useState([]);
  const [stockNews, setStockNews] = useState([]);
  const [intervalStockPrices, setIntervalStockPrices] = useState({});
  const [earningsData, setEarningsData] = useState({});

  const options = {
    tooltips: {
      enabled: true,
      mode: "single",
      callbacks: {
        label: function (tooltipItems: any, data: any) {
          let toolTipIndex = tooltipItems.index;
          var multistringText = [
            `Price - ${tooltipItems.yLabel}`,
            `Volume - ${data.datasets[0].data[toolTipIndex]["volume"]}`,
          ];
          return multistringText;
        },
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
            gridLines: false,
            // beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };
  const [companyOverview, setCompanyOverview] = useState({ Description: "" });

  const chart = (selectedStockSymbol: string) => {
    let data1: any[] = [];
    let data2: any[] = [];
    StockService.getIntradayStockPrices(selectedStockSymbol).then(
      (res: any) => {
        res.data.forEach((interval: any) => {
          data1.push(interval.date);
          data2.push(interval);
        });

        setIntervalStockPrices({
          labels: data1,
          datasets: [
            {
              label: "5min",
              data: data2,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
              // xAxisID: "6. date",
              // yAxisID: "1. open",
            },
          ],
        });
      }
    );

    let date1: any[] = [];
    let actualEPS: any[] = [];
    let expectedEPS: any[] = [];

    StockService.getCompanyEarnings(selectedStockSymbol).then((res: any) => {
      console.log(res);
      res.data.earningsCalendar.forEach((date: any) => {
        date1.push(date.date);
        expectedEPS.push(date.epsEstimate);
        actualEPS.push(date.epsActual);
      });

      setEarningsData({
        labels: date1,
        datasets: [
          {
            label: "Actual EPS",
            data: actualEPS,
          },
          {
            label: "Expected EPS",
            data: expectedEPS,
          },
        ],
      });
    });
    console.log(data2);
  };

  useEffect(() => {
    chart(selectedStockSymbol);

    StockService.getCompanyOverview(selectedStockSymbol).then((res: any) => {
      setCompanyOverview(res.data);
    });

    StockService.getPeerStocks(selectedStockSymbol).then((res: any) => {
      setRelatedStocks(res.data);
    });

    StockService.getStockNews(selectedStockSymbol).then((res: any) => {
      console.log(res.data);
      setStockNews(res.data);
    });
  }, [selectedStockSymbol]);

  const handlePeerStockClick = (stockSymbol: string) => {
    setSelectedStockSymbol(stockSymbol);
  };
  return (
    <>
      <Card style={{ width: "200px", backgroundColor: "#314B70" }}>
        <CardContent>
          <p>{selectedStockSymbol}</p>
          <FavoriteBorderIcon></FavoriteBorderIcon>
        </CardContent>
      </Card>

      <Line data={intervalStockPrices} options={options} />

      <StyledCarousel>
        {stockNews.map((res: any) => (
          <>
            <a href={res.url} target="_blank">
              <img src={res.image} height="500" width="500" />
              <div>{res.headline}</div>
            </a>
          </>
        ))}
      </StyledCarousel>

      <Line data={earningsData}></Line>

      <div>
        <h6>Company Overview</h6>
        {companyOverview.Description}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {relatedStocks.map((stock: string, index: number) => (
          <Card
            style={{ backgroundColor: "#314B70" }}
            key={index}
            onClick={() => handlePeerStockClick(stock)}
          >
            <CardContent>{stock}</CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
