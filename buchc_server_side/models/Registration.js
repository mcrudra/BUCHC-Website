import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    studentId: {
      type: String,
      required: true,
      trim: true,
    },
    currentSemester: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    programAndDepartment: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    fideRating: {
      type: String,
      trim: true,
    },
    interestReason: {
      type: String,
      trim: true,
    },
    interestedDepartment: {
      type: String,
      trim: true,
    },
    previousWorkExperience: {
      type: String,
      trim: true,
    },
    otherDepartmentInterest: {
      type: String,
      trim: true,
    },
    involvedInOtherClubs: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    otherClubsDetails: {
      type: String,
      trim: true,
    },
    registrationSemester: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
