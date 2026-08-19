import api from "./axios";

export const getDashboardSummaryAPI=async()=>{
    const response=await api.get("/dashboardSummary")

    return response.data
}