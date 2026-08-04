import { getDashboardSummary } from "../services/dashboard.service.js";

export const dashBoardController = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const result = await getDashboardSummary(userId)

        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully.",
            data: result
        })
    } catch (error) {
        next(error)
    }

}