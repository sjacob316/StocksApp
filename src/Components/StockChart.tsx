import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StockService } from "../Services/StockService";
import { getBussinessDateRange } from "./helpers";
import Chart from 'react-apexcharts';
import { Button, Typography } from "@material-ui/core";

interface StockChartProps {
    stockSymbol: string;
}

export const StockChart = ({stockSymbol}: StockChartProps) => {
    const [chartData, setChartData] = useState({options: { chart: { id: "stock-price-chart" }, xaxis: {categories: [], labels: {show: false}}}, series: [{name: "series", data: []}]});
    useEffect(() => {
        let timeRange = getBussinessDateRange("1day");
        StockService.getIntradayStockPrices(stockSymbol, timeRange.startTime, timeRange.endTime).then(res => {
            setChartData({
                options: {
                  chart: {
                    id: "stock-price-chart"
                  },
                  xaxis: {
                    categories: res.data.t,
                    labels: {
                      show: false
                    }
                  }
                  
                },
                series: [{
                  name: 'series',
                  data: res.data.c
                }]
              })  
        })
    }, [stockSymbol])

    const handleDateRangeClick = (view: string) => {
        let timeRange = getBussinessDateRange(view);
        StockService.getIntradayStockPrices(stockSymbol, timeRange.startTime, timeRange.endTime).then(res => {
            setChartData({
              options: {
                chart: {
                  id: "stock-price-chart",
                //   toolbar: {
                //     tools: {
                //       zoom: false
                //     }
                //   }
                },
                xaxis: {
                  categories: res.data.t,
                  labels: {
                    show: false
                  }
                }
              },
              series: [{
                name: 'series',
                data: res.data.c
              }]
            })
        })
    }
    return (
    <React.Fragment>
        <Typography>Test</Typography>
        <Chart options={chartData?.options} series={chartData?.series} type="line" width={500} height={320} />        

        <Button onClick={() => handleDateRangeClick("1day")}>1 D</Button>
        <Button onClick={() => handleDateRangeClick("1week")}>1 W</Button>
        <Button onClick={() => handleDateRangeClick("1month")}>1 M</Button>
        <Button onClick={() => handleDateRangeClick("6month")}>6 M</Button>
        <Button onClick={() => handleDateRangeClick("1year")}>1 Y</Button>
        <Button onClick={() => handleDateRangeClick("5year")}>5 Y</Button>
    </React.Fragment>
    
    )
}