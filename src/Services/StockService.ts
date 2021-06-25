import moment from 'moment';
import React from 'react';
import axios from "./AxiosService";


export const StockService = {
    getStockSymbols(value: string) {
        return axios.get(`/api/stocks/symbol-search/${value}`)        
    },

    getCompanyOverview(stockSymbol: string) {
        return axios.get(`/api/stocks/overview/${stockSymbol}`)
    },

    getStockQuote(stockSymbol: string) {
        return axios.get(`/api/stocks/quote/${stockSymbol}`)
    },

    getIntradayStockPrices(stockSymbol: string, startTime: string, endTime: string) {
        console.log("calling this")
        console.log(`${stockSymbol} and ${startTime} and ${endTime}`)
        return axios.get(`/api/stocks/stock-candle/${stockSymbol}/${startTime}/${endTime}`)
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
    },

    getNewsSentiment(stockSymbol: string) {
        return axios.get(`/api/stocks/news-sentiment/${stockSymbol}`)
    },

    getSocialSentiment(stockSymbol: string) {
        return axios.get(`/api/stocks/social-sentiment/${stockSymbol}`)
    }
}
