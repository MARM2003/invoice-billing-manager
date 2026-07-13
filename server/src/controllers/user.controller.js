import { updateProfileService } from "../services/user.service.js";

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