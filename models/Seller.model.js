const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

/**
 * Seller Login Model
 * */

const sellerSchema = new Schema(
  {
    sellerID: {
      type: String,
      required: true,
    },
    sellerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: {
          validator: function(v) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
          },
          message: '{VALUE} is not a valid Email!'
        },
        required: [true, 'User email required']
    },
    contactNumber: {
        type: String,
        validate: {
          validator: function(v) {
            return /^\d{10}$/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
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
        validate: {
          validator: function(v) {
            return /((?=.*[a-z])(?=.*[@#$%!]).{6,40})/.test(v);
          },
          message: '{VALUE} is not a valid password!'
        },
        required: [true, 'User password required']
    },
    saltSecret: String
  },
  { timestamps: true }
);

sellerSchema.pre("save", function (next) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        this.saltSecret = salt;
        next();
      });
    });
  });
  
sellerSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Seller", sellerSchema);