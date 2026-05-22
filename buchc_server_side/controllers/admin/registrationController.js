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

    // Build a union of all keys present in registrations so we don't skip any info
    const allKeys = new Set();
    const registrationObjects = registrations.map((r) => r.toObject({ getters: true }));
    registrationObjects.forEach((obj) => {
      Object.keys(obj).forEach((k) => {
        if (k !== "__v") allKeys.add(k);
      });
    });

    // Helper to prettify header names
    const prettyHeader = (key) => {
      if (key === "_id") return "ID";
      if (key === "createdAt") return "Submitted At";
      if (key === "updatedAt") return "Updated At";
      // common replacements
      const replacements = {
        studentId: "Student ID",
        currentSemester: "Current Semester",
        programAndDepartment: "Program / Dept",
        interestedDepartment: "Interested Dept",
        contactNumber: "Contact",
        fideRating: "FIDE/Online Rating",
        otherDepartmentInterest: "Other Dept Interest",
        involvedInOtherClubs: "Involved In Other Clubs",
        otherClubsDetails: "Other Clubs Details",
        registrationSemester: "Registration Semester",
        interestReason: "Interest Reason",
        previousWorkExperience: "Previous Work Experience",
      };
      if (replacements[key]) return replacements[key];

      // Fallback: split camelCase and underscores, capitalize words
      const words = key
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1));
      return words.join(" ");
    };

    // Ensure a stable column order for common fields first
    const preferredOrder = [
      "_id",
      "name",
      "studentId",
      "currentSemester",
      "email",
      "programAndDepartment",
      "interestedDepartment",
      "contactNumber",
      "fideRating",
      "interestReason",
      "previousWorkExperience",
      "otherDepartmentInterest",
      "involvedInOtherClubs",
      "otherClubsDetails",
      "registrationSemester",
      "createdAt",
      "updatedAt",
    ];

    const orderedKeys = [];
    preferredOrder.forEach((k) => {
      if (allKeys.has(k)) {
        orderedKeys.push(k);
        allKeys.delete(k);
      }
    });
    // Append any remaining keys
    Array.from(allKeys)
      .sort()
      .forEach((k) => orderedKeys.push(k));

    const rows = registrationObjects.map((registration) => {
      const row = {};
      orderedKeys.forEach((key) => {
        let val = registration[key];
        if (val === undefined || val === null) {
          val = "";
        } else if (val instanceof Date) {
          val = val.toISOString();
        } else if (typeof val === "object") {
          try {
            val = JSON.stringify(val);
          } catch (e) {
            val = String(val);
          }
        } else {
          val = String(val);
        }
        row[prettyHeader(key)] = val;
      });
      return row;
    });

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
