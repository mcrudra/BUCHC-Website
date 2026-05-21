import Setting from "../../models/Setting.js";
import { body, validationResult } from "express-validator";

export const getSettings = async (req, res) => {
  try {
    const settings = {
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
    };

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const {
      join_link,
      club_email,
      facebook_link,
      instagram_link,
      linkedin_link,
      registration_open,
      registration_page_title,
      registration_page_description,
      registration_form_link,
      registration_semester_label,
      registration_live_text,
    } = req.body;

    if (join_link !== undefined)
      await Setting.set("join_link", join_link || "");
    if (club_email !== undefined)
      await Setting.set("club_email", club_email || "");
    if (facebook_link !== undefined)
      await Setting.set("facebook_link", facebook_link || "");
    if (instagram_link !== undefined)
      await Setting.set("instagram_link", instagram_link || "");
    if (linkedin_link !== undefined)
      await Setting.set("linkedin_link", linkedin_link || "");
    if (registration_open !== undefined)
      await Setting.set(
        "registration_open",
        registration_open === true ||
          registration_open === "true" ||
          registration_open === "on"
          ? "true"
          : "false",
      );
    if (registration_page_title !== undefined)
      await Setting.set(
        "registration_page_title",
        registration_page_title || "",
      );
    if (registration_page_description !== undefined)
      await Setting.set(
        "registration_page_description",
        registration_page_description || "",
      );
    if (registration_form_link !== undefined)
      await Setting.set("registration_form_link", registration_form_link || "");
    if (registration_semester_label !== undefined)
      await Setting.set(
        "registration_semester_label",
        registration_semester_label || "",
      );
    if (registration_live_text !== undefined)
      await Setting.set("registration_live_text", registration_live_text || "");

    res.json({ message: "Settings updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
