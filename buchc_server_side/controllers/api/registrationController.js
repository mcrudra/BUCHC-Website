import Registration from "../../models/Registration.js";
import Setting from "../../models/Setting.js";
import { sendRegistrationCompleteMail } from "../../utils/mailer.js";

export const createRegistration = async (req, res) => {
  try {
    const registrationOpen = await Setting.get("registration_open", "false");

    if (registrationOpen !== "true") {
      return res
        .status(403)
        .json({ message: "Registration is currently closed" });
    }

    const activeSemester = await Setting.get(
      "registration_semester_label",
      "Spring 26",
    );
    const {
      name,
      studentId,
      currentSemester,
      email,
      programAndDepartment,
      contactNumber,
      fideRating,
      interestReason,
      interestedDepartment,
      previousWorkExperience,
      otherDepartmentInterest,
      involvedInOtherClubs,
      otherClubsDetails,
    } = req.body;

    if (!name || !studentId || !currentSemester || !email) {
      return res.status(400).json({
        message: "Name, student ID, current semester, and email are required",
      });
    }

    const registration = await Registration.create({
      name,
      studentId,
      currentSemester,
      email,
      programAndDepartment,
      contactNumber,
      fideRating,
      interestReason,
      interestedDepartment,
      previousWorkExperience,
      otherDepartmentInterest,
      involvedInOtherClubs,
      otherClubsDetails,
      registrationSemester: activeSemester,
    });

    let mailStatus = "skipped";
    try {
      const mailResult = await sendRegistrationCompleteMail({
        to: email,
        name,
        studentId,
        currentSemester,
        registrationSemester: activeSemester,
      });

      mailStatus = mailResult?.skipped ? "skipped" : "sent";
    } catch (mailError) {
      mailStatus = "failed";
      console.error("Registration completion email failed:", mailError);
    }

    res.status(201).json({
      message: "Registration submitted successfully",
      registration,
      mailStatus,
    });
  } catch (error) {
    console.error("Create registration error:", error);
    res.status(500).json({ message: error.message });
  }
};
