import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  captain: { type: mongoose.Types.ObjectId, ref: "Captain", required: false },
  customer: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reason: { type: String },
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
});

export default mongoose.model("Appointment", AppointmentSchema);