import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
import bcrypt from "bcryptjs";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    firstname: req.body.firstname,
    lastName: req.body.lastName,
    otherName: req.body.otherName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    phone: req.body.phone,
    gender: req.body.gender,
    street: req.body.street,
    lga: req.body.lga,
    city: req.body.city,
    zipCode: req.body.zipCode,
    lgaOfOrigin: req.body.lgaOfOrigin,
    nationality: req.body.nationality,
    stateOfOrigin: req.body.stateOfOrigin,
    role: "Buyer",
    maritalStatus: req.body.maritalStatus,
    isAdmin: false,
  });
  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    firstname: user.firstname,
    lastName: user.lastName,
    otherName: user.otherName,
    email: user.email,
    password: user.password,
    phone: user.phone,
    gender: user.gender,
    street: user.street,
    lga: user.lga,
    city: user.city,
    zipCode: user.zipCode,
    lgaOfOrigin: user.lgaOfOrigin,
    nationality: user.nationality,
    stateOfOrigin: user.stateOfOrigin,
    role: user.role,
    maritalStatus: user.maritalStatus,
    isAdmin: user.isAdmin,
  });
});

export default handler;
