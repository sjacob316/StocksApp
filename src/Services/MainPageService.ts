import moment from "moment";
import axios from "../Services/AxiosService";

export const MainPageService = {
    getGeneralNews() {        
        return axios.get(`/api/stocks/general-news`)        
    }
}