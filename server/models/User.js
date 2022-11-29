const mongoose = require('mongoose');

const { Schema } = mongoose;
// Import bcrypt for password hashing
const bcrypt = require('bcrypt');

// Declare userSchema
const userSchema = new Schema({
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  console.log('hello');
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
  console.log('hello again');
  let password = this.getUpdate().password;
  console.log(password);
  if (password) {
    const saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);
    console.log(password);
    this.getUpdate().password = password;
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
