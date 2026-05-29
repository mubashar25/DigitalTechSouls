import SiteSettings from "../../../models/Settings.js";

const updateSiteSettingsController =
  async (req, res) => {
    try {
      let settings =
        await SiteSettings.findOne();

      // 🔥 CREATE SETTINGS
      if (!settings) {
        settings =
          await SiteSettings.create(
            req.body
          );
      } else {
        // 🔥 UPDATE SETTINGS
        settings =
          await SiteSettings.findByIdAndUpdate(
            settings._id,
            req.body,
            {
              new: true,
              runValidators: true,
            }
          );
      }

      res.status(200).json({
        success: true,
        message:
          "Site settings updated successfully",
        settings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to update site settings",
        error: error.message,
      });
    }
  };

export default updateSiteSettingsController;