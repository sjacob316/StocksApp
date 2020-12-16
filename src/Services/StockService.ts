import moment from 'moment';
import React from 'react';
import axios from "../Services/AxiosService";


export const StockService = {
    getStockSymbols(value: string) {
        return axios.get(`/api/stocks/symbol-search/${value}`)        
    },

    getCompanyOverview(stockSymbol: string) {
        return axios.get(`/api/stocks/overview/${stockSymbol}`)
    },

    getIntradayStockPrices(stockSymbol: string) {
        return axios.get(`/api/stocks/time-series/${stockSymbol}`)
    },

    getStockInfo(stockSymbol: string) {
        return axios.get(`/api/stocks/income/${stockSymbol}`)
    },

    getStockNews(stockSymbol: string) {        
        let startDate = moment().subtract(3, "days").format("YYYY-MM-DD");
        let endDate = moment().format("YYYY-MM-DD");                
        return axios.get(`/api/stocks/company-news/${stockSymbol}/${startDate}/${endDate}`)
    },

    getCompanyEarnings(stockSymbol: string) {
        return axios.get(`/api/stocks/company-earnings/${stockSymbol}`)
    },

    getPeerStocks(stockSymbol: string) {
        return axios.get(`/api/stocks/peers/${stockSymbol}`)        
    }
}
