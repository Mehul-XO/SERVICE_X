import mongoose from "mongoose";

const CaptainSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  specialization: { type: String },
  role: {
    type: String,
    enum: ['captain', 'doctor', 'admin'], // Add all acceptable roles here
    required: true
  },
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});


export default mongoose.model("Captain", CaptainSchema);
