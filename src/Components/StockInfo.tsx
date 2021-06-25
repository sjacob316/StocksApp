import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { StockService } from "../Services/StockService";
import { Line } from "react-chartjs-2";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
import moment from "moment";
import { getBussinessDateRange } from "./helpers";
import { Table, Tag, Space, Progress } from 'antd';
import Chart from 'react-apexcharts'
import { StockCard } from "./StockCard";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { StockChart } from "./StockChart";
import { StockEarnings } from "./StockEarnings";

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
  const [intervalStockPrices, setIntervalStockPrices] = useState<any>({});
  const [earningsData, setEarningsData] = useState({});
  const [newsSentiment, setNewsSentiment] = useState();
  const [socialSentiment, setSocialSentiment] = useState<any>({reddit: [], twitter: []});

  const columns = [
    {
      title: 'Time',
      dataIndex: 'atTime',
      key: 'atTime',
      render: (text: string) => moment(text).format("ddd, MMM Do YYYY")
    },
    {
      title: 'Mention Count',
      dataIndex: 'mention',
      key: 'mention',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    // },
    // {
    //   title: 'Action',
    //   key: 'action',
    // },
  ];
  const [companyOverview, setCompanyOverview] = useState({ Description: "" });
  const [chartData, setChartData] = useState<any>({options: { chart: { id: "stock-price-chart" }, xaxis: {categories: []}}, series: [{name: "series", data: []}]});
  // const state = {
  //   options: {
  //     chart: {
  //       id: 'apexchart-example'
  //     },
  //     xaxis: {
  //       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
  //     }
  //   },
  //   series: [{
  //     name: 'series-1',
  //     data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  //   }]
  // }
  const chart = async (selectedStockSymbol: string) => {
    let data1: any[] = [];
    let data2: any[] = [];
    let timeRange = await getBussinessDateRange("1day");
    let responseStatus = '';
    let i = 0;
    do {
      StockService.getIntradayStockPrices(selectedStockSymbol, timeRange.startTime, timeRange.endTime).then(res => {
        data1 = res.data.t
        data2 = res.data.c
        responseStatus = res.data.s
        setChartData({
          options: {
            chart: {
              id: "stock-price-chart"
            },
            xaxis: {
              categories: data1,
              labels: {
                show: false
              }
            }
            
          },
          series: [{
            name: 'series',
            data: data2
          }]
        })        
          setIntervalStockPrices({
          labels: data1,
          datasets: [
            {
              label: "5min",
              data: data2,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        });
      })      
      console.log(responseStatus);      
    } while (responseStatus);

    let date1: any[] = [];
    let actualEPS: any[] = [];
    let expectedEPS: any[] = [];

    // StockService.getCompanyEarnings(selectedStockSymbol).then((res: any) => {
    //   console.log(res);
    //   res.data.earningsCalendar.forEach((date: any) => {
    //     date1.push(date.date);
    //     expectedEPS.push(date.epsEstimate);
    //     actualEPS.push(date.epsActual);
    //   });

    //   setEarningsData({
    //     labels: date1,
    //     datasets: [
    //       {
    //         label: "Actual EPS",
    //         data: actualEPS,
    //       },
    //       {
    //         label: "Expected EPS",
    //         data: expectedEPS,
    //       },
    //     ],
    //   });
    // });
    console.log(data2);
  };

  const stateTwo = {
          
    series: [{
      name: 'Expected EPS',
      data: [[new Date(), "221"],[new Date("01-25-2021"), "120"], ["01/23/2020", "223"]]
    },
    {
      name: 'Actual EPS',
      data: [[new Date(), "552"],[new Date("01-25-2021"), "160"], ["01/23/2020", "32"]]
    },
      // {
      //   name: 'TEAM 3',
      //   data: ["12/21/2020","12/22/2020","12/23/2020",]
      // },
      // {
      //   name: 'TEAM 4',
      //   data: ["12/21/2020","12/22/2020","12/23/2020",]
      // },
      // {
      //   name: 'TEAM 5',
      //   data: ["12/21/2020","12/22/2020","12/23/2020",]
      // },
    ],
    options: {
      chart: {
        // height: 350,
        // type: 'scatter',
        // zoom: {
        //   type: 'xy'
        // }
      },
      // dataLabels: {
      //   enabled: false
      // },
      // grid: {
      //   xaxis: {
      //     lines: {
      //       show: true
      //     }
      //   },
      //   yaxis: {
      //     lines: {
      //       show: true
      //     }
      //   },
      // },
      xaxis: {
        type: "datetime",
      },
      // yaxis: {
      //   max: 70
      // }
    },
  };
  const [earnings, setEarnings] = useState<any>({
    series: [{
      name: "Expected",
      data: []
    }, {
      name: "Actual",
      data: []
    }],
    options: {
      xaxis: {
        type: "datetime"
      }
    }
  });
  useEffect(() => {
    chart(selectedStockSymbol);

    StockService.getCompanyEarnings(selectedStockSymbol).then((res) => {
      const expected: any = [];
      const actual: any = [];

      res.data.forEach((interval: any) => {
        expected.push([interval.period, interval.estimate])
        actual.push([interval.period, interval.actual])
      })
      setEarnings({
        series: [{
          name: "Expected",
          data: expected,
        }, {
          name: "Actual",
          data: actual
        }],
        options: {
          stroke: {
            width: "20px"
          },
          fill: {
            height: "20px",
            width: "20px"
          },
          xaxis: {
            type: "datetime"
          }
        }
      })
      console.log(res.data);
    })

    StockService.getCompanyOverview(selectedStockSymbol).then((res: any) => {
      setCompanyOverview(res.data);
    });

    StockService.getPeerStocks(selectedStockSymbol).then((res: any) => {
      setRelatedStocks(res.data);
    });

    StockService.getStockNews(selectedStockSymbol).then((res: any) => {
      setStockNews(res.data);
    });

    StockService.getSocialSentiment(selectedStockSymbol).then((res: any) => {
      console.log(res.data)
      setSocialSentiment(res.data);
    })

    StockService.getNewsSentiment(selectedStockSymbol).then((res) => {
      console.log(res.data)
    })
  }, [selectedStockSymbol]);

  const handlePeerStockClick = (stockSymbol: string) => {
    console.log(socialSentiment);
    setSelectedStockSymbol(stockSymbol);
  };

  const handleCandleQuoteClick = async (view: string) => {
    let data1: any[] = [];
    let data2: any[] = [];
    let timeRange = await getBussinessDateRange(view);

    StockService.getIntradayStockPrices(selectedStockSymbol, timeRange.startTime, timeRange.endTime).then(res => {
      data1 = res.data.t
      data2 = res.data.c
      console.log(data1);

      setChartData({
        options: {
          chart: {
            id: "stock-price-chart",
            toolbar: {
              tools: {
                zoom: false
              }
            }
          },
          xaxis: {
            categories: data1,
            labels: {
              show: false
            }
          }
        },
        series: [{
          name: 'series',
          data: data2
        }]
      })  
          
        setIntervalStockPrices({
        labels: data1,
        datasets: [
          {
            label: "5min",
            data: data2,
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      });
    })   
  }
  return (
    <React.Fragment>
      <StockChart stockSymbol={selectedStockSymbol}/>
      {/* <Chart options={chartData?.options} series={chartData?.series} type="line" width={500} height={320} /> */}
      {/* <Line data={intervalStockPrices} options={options} /> */}
      

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
      {/* <Typography>Earnings</Typography>
      <hr style={{borderTop: "2px solid #bbb", borderRadius: "5px"}}/> */}
      <StockEarnings stockSymbol={selectedStockSymbol}/>
      {/* <Line data={earningsData}></Line> */}
      <Typography>Social Media Sentiment</Typography>
      <hr style={{borderTop: "2px solid #bbb", borderRadius: "5px"}}/>
      {/* <div style={{display: "flex", justifyContent: "space-evenly"}}> */}
        <div>
        <Typography>Reddit</Typography>
      <Table columns={columns} dataSource={socialSentiment.reddit} />
        </div>
        <div>
        <Typography>Twitter</Typography>
      <Table columns={columns} dataSource={socialSentiment.twitter} />
      <Progress type="dashboard" percent={socialSentiment.twitter.positiveScore} strokeColor="green"/>
    <Progress type="dashboard" percent={socialSentiment.twitter.negativeScore} gapDegree={30} strokeColor="red"/>

        </div>
      

      {/* </div> */}
      
      <div>
        <Typography>Company Overview</Typography>
        <hr style={{borderTop: "2px solid #bbb", borderRadius: "5px"}}/>
        {companyOverview.Description}
      </div>

      <Typography>Peer Stocks</Typography>
        <hr style={{borderTop: "2px solid #bbb", borderRadius: "5px"}}/>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {relatedStocks.map((stockSymbol: string, index: number) => (
          <StockCard stockSymbol={stockSymbol}/>
        ))}
      </div>
    </React.Fragment>
  );
}
