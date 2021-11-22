import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastName: { type: String, required: true },
    otherName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    gender: { type: String, required: true },
    street: { type: String, required: true },
    lga: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
    lgaOfOrigin: { type: String, required: true },
    nationality: { type: String, required: true },
    stateOfOrigin: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
