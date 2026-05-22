import User from "../../../models/User.js";

const getUsersStatsController =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments();

      const adminUsers =
        await User.countDocuments({
          role: "admin",
        });

      const blockedUsers =
        await User.countDocuments({
          isBlocked: true,
        });

      res.status(200).json({
        success: true,
        totalUsers,
        adminUsers,
        blockedUsers,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch user stats",
        error: error.message,
      });
    }
  };

export default getUsersStatsController;