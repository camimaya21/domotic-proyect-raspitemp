require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

const password = `${process.env.PASSADMIN}`;
const encryptedPass = bcrypt.hashSync(password, salt);

mongoose.connect(process.env.DBURL)

const user = [
  { username: "admin",
  name: "Camila Maya",
  email: "camilamaya21@gmail.com",
  city: "Madrid",
  password: "encryptedPass",
  lat: "40.392523",
  lon: "-3.698436",
  role: "admin"
}

]

User.create(user, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((user) => {
    console.log(user.name)
  });
  mongoose.connection.close();
});
