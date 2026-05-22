import Setting from "../../models/Setting.js";

export const getJoinLink = async (req, res) => {
  try {
    const joinLink = await Setting.get("join_link", "");
    res.json({ join_link: joinLink });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllSettings = async (req, res) => {
  try {
    res.json({
      join_link: await Setting.get("join_link", ""),
      club_email: await Setting.get("club_email", ""),
      facebook_link: await Setting.get("facebook_link", ""),
      instagram_link: await Setting.get("instagram_link", ""),
      linkedin_link: await Setting.get("linkedin_link", ""),
      registration_open: await Setting.get("registration_open", "false"),
      registration_page_title: await Setting.get(
        "registration_page_title",
        "BUCHC Registration",
      ),
      registration_page_description: await Setting.get(
        "registration_page_description",
        "Register to join the BUCHC community and stay connected with club updates.",
      ),
      registration_form_link: await Setting.get("registration_form_link", ""),
      registration_semester_label: await Setting.get(
        "registration_semester_label",
        "Spring 26",
      ),
      registration_live_text: await Setting.get(
        "registration_live_text",
        "Registration is live now",
      ),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
