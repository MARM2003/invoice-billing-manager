import { updateProfileService, getUserProfileService, updateUserProfileService } from "../services/user.service.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await updateProfileService({
      userId,
      body: req.body,
      file: req.file,
    });
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const user = await getUserProfileService(userId);

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


export const updateUserProfile = async (
  req,
  res,
  next
) => {
  try {
    const userId = req.user.userId;

    const updatedUser =
      await updateUserProfileService(
        userId,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};