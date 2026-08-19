import { getDashboardSummaryAPI } from "../api/dashboard.api";

export const getDashboardSummaryService=async()=>{
    return await getDashboardSummaryAPI();
}