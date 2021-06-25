import { Typography } from "antd";
import React, { useState } from "react"
import { useEffect } from "react";
import { StockService } from "../Services/StockService";
import Chart from 'react-apexcharts';

interface StockEarningsProps {
    stockSymbol: string;
}

export const StockEarnings = ({stockSymbol}: StockEarningsProps) => {
    const [earnings, setEarnings] = useState({
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
        StockService.getCompanyEarnings(stockSymbol).then((res) => {
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
                xaxis: {
                  type: "datetime"
                }
              }
            })
          })
      })
    return (
        <React.Fragment>
            <Typography>Earnings</Typography>
            <hr style={{borderTop: "2px solid #bbb", borderRadius: "5px"}}/>
            <Chart options={earnings?.options} series={earnings?.series} type="scatter" width={500} height={320} />
        </React.Fragment>
    )
}