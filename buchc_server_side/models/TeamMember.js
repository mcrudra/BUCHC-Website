import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: false,
      default: "",
    },
    department: {
      type: String,
      required: true,
      enum: ["governing", "em", "creative", "training", "hr"],
      default: "governing",
    },
    photo: {
      type: String,
      default: "/logo-Ba1-O6YK.png",
    },
    mail: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;
