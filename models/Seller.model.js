const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Seller Login Model
 * */

const sellerSchema = new Schema(
  {
    sellerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cnfPassword: {
        type: Number,
        required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);