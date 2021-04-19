import moment from "moment";
import axios from "../Services/AxiosService";

export const MainPageService = {
    getGeneralNews() {        
        return axios.get(`/api/stocks/general-news`);
    },

    getIpoCalendar() {
        return axios.get(`/api/stocks/ipo-calendar/2021-04-15/2021-05-14`);
    },

    getEarningsCalendar() {
        return axios.get(`/api/stocks/earnings-calendar/2021-04-15/2021-05-14`);
    }
}