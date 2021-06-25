import moment from "moment";
import axios from "../Services/AxiosService";

export const MainPageService = {
    getGeneralNews() {        
        return axios.get(`/api/stocks/general-news`);
    },

    getIpoCalendar(startDate: string, endDate: string) {
        return axios.get(`/api/stocks/ipo-calendar/${startDate}/${endDate}`);
    },

    getEarningsCalendar() {
        return axios.get(`/api/stocks/earnings-calendar/2021-04-01/2021-04-30`);
    }
}