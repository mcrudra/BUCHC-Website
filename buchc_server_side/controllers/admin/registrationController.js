import XLSX from "xlsx";
import Registration from "../../models/Registration.js";

export const getRegistrations = async (req, res) => {
  try {
    const { semester } = req.query;
    const filter = semester ? { registrationSemester: semester } : {};

    const registrations = await Registration.find(filter).sort({
      registrationSemester: 1,
      createdAt: 1,
    });
    const semesters = await Registration.distinct("registrationSemester");
    semesters.sort((a, b) => a.localeCompare(b));

    res.json({ registrations, semesters });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const exportRegistrations = async (req, res) => {
  try {
    const { semester } = req.query;
    const filter = semester ? { registrationSemester: semester } : {};

    const registrations = await Registration.find(filter).sort({
      registrationSemester: 1,
      createdAt: 1,
    });

    const rows = registrations.map((registration) => ({
      Name: registration.name,
      "Student ID": registration.studentId,
      "Current Semester": registration.currentSemester,
      Email: registration.email,
      "Registration Semester": registration.registrationSemester,
      "Submitted At": registration.createdAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    const fileBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });
    const safeSemester = semester
      ? semester.replace(/[^a-z0-9]+/gi, "_")
      : "all";

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=registrations-${safeSemester}.xlsx`,
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.send(fileBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
