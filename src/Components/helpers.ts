import moment from "moment";

export const getBussinessDateRange = (stockView: string) => {
    const timeRange = {
        startTime: "",
        endTime: ""
    }
    switch(stockView) {
        case "1day":            
            timeRange.startTime = Math.floor(moment().startOf("day").valueOf()/1000).toString();
            timeRange.endTime = Math.floor(moment().endOf("day").valueOf()/1000).toString();
            break;
        case "1week":
            timeRange.startTime = Math.floor(moment().subtract(1, "week").startOf("day").valueOf()/1000).toString()
            timeRange.endTime = Math.floor(moment().endOf("day").valueOf()/1000).toString();
            break;
        case "1month":
            timeRange.startTime = Math.floor(moment().subtract(1, "month").startOf("day").valueOf()/1000).toString()
            timeRange.endTime = Math.floor(moment().endOf("day").valueOf()/1000).toString();
            break;
        case "6month":
            timeRange.startTime = Math.floor(moment().subtract(6, "month").startOf("day").valueOf()/1000).toString()
            timeRange.endTime = Math.floor(moment().endOf("day").valueOf()/1000).toString();
            break;
        case "1year":
            timeRange.startTime = Math.floor(moment().subtract(1, "year").startOf("day").valueOf()/1000).toString()
            timeRange.endTime = Math.floor(moment().endOf("day").valueOf()/1000).toString();
            break;
        case "5year":
            timeRange.startTime = Math.floor(moment().subtract(5, "year").startOf("day").valueOf()/1000).toString()
            timeRange.endTime = Math.floor(moment().endOf("day").valueOf()/1000).toString();
            break;
        }
    return timeRange;
}