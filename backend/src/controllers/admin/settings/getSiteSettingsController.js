import SiteSettings from "../../../models/Settings.js";

const getSiteSettingsController =
  async (req, res) => {
    try {
      let settings =
        await SiteSettings.findOne();

      // 🔥 AUTO CREATE DEFAULT SETTINGS
      if (!settings) {
        settings =
          await SiteSettings.create(
            {}
          );
      }

      res.status(200).json({
        success: true,
        settings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch site settings",
        error: error.message,
      });
    }
  };

export default getSiteSettingsController;