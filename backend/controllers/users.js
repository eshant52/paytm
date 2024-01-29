const {
  signupValidate,
  signinValidate,
  userUpdateValidate,
} = require("../zod");
const { User, Account } = require("../db/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const BCRYPT_SALT_ROUND = Number(process.env.BCRYPT_SALT_ROUND);

const JWT_SETTINGS = { expiresIn: "5h" };

async function getBulk(req, res, next) {
  const filter = req.query.filter || "";
  const userId = req.userId;

  const filteredResult = await User.find({
    "$or": [
      {
        firstname: {
          "$regex": filter,
          "$options": "i",
        }
      },
      {
        "lastname": {
          "$regex": filter,
          "$options": "i",
        }
      }
    ],
    _id: {
      "$ne": new mongoose.Types.ObjectId(userId),
    }
  });

  res.status(200).json({
    users: filteredResult.map((result) => {
      return ({
      id: result._id,
      username: result.username,
      firstname: result.firstname,
      lastname: result.lastname,
    })}),
  });
}

async function putUser(req, res, next) {
  const userId = req.userId;
  const jsonBody = req.body;
  try {
    const { success } = userUpdateValidate.safeParse(jsonBody);

    if (!success) {
      return res
        .status(411)
        .json({ message: "Error while updating information" });
    }

    const user = await User.findById(userId);

    if (jsonBody?.password) {
      const password = await bcrypt.hash(jsonBody.password, BCRYPT_SALT_ROUND);
      user.password = password;
    }

    if (jsonBody?.firstname) {
      user.firstname = jsonBody.firstname;
    }

    if (jsonBody?.lastname) {
      user.lastname = jsonBody.lastname;
    }

    const userupdated = await user.save();

    if (userupdated) {
      res.status(200).json({ message: "Updated successfully" });
    } else {
      res.status(500).json({ message: "something gone wrong" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something wrong", error: err });
  }
}

async function getUser(req, res, next) {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json({
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      });
    } else {
      res.status(500).json({ message: "something gone wrong" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something wrong", error: err });
  }
}

async function postSignup(req, res, next) {
  const jsonBody = req.body;

  try {
    const { success } = signupValidate.safeParse(jsonBody);
    if (!success) {
      return res.status(411).json({
        message: "Email already taken/ Incorrect inputs",
      });
    }

    const isUser = await User.findOne({ username: jsonBody.username });

    if (isUser) {
      return res
        .status(411)
        .send({ message: "Email already taken/ Incorrect inputs" });
    }

    const hashedPassword = await bcrypt.hash(
      jsonBody.password,
      BCRYPT_SALT_ROUND
    );

    const user = await User.create({
      username: jsonBody.username,
      firstname: jsonBody.firstname,
      lastname: jsonBody.lastname,
      password: hashedPassword,
    });

    // create account with some random balance
    await Account.create({
      userId: user._id,
      balance: 1 + Math.random() * 10000,
    });

    // create jwt token
    const payload = { userId: user._id };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRETE, JWT_SETTINGS);
    const bearerToken = `Bearer ${jwtToken}`;

    res.setHeader("Authorization", bearerToken);

    res.status(200).json({
      message: "User created succesfully",
      token: jwtToken,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong at backend", error: err });
  }
}

async function postSignin(req, res, next) {
  const jsonBody = req.body;
  try {
    const { success } = signinValidate.safeParse(jsonBody);
    if (!success) {
      return res.status(411).json({
        message: "Error while loggin in, invalid credentials",
      });
    }

    const user = await User.findOne({ username: jsonBody.username });

    if (!user) {
      return res
        .status(411)
        .send({ message: "Error while loggin in, username does not exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      jsonBody.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(411).json({
        message: "Error while loggin in, password is incorrect",
      });
    }

    // create jwt token
    const payload = { userId: user._id };
    const jwtToken = jwt.sign(payload, process.env.JWT_SECRETE, JWT_SETTINGS);
    const bearerToken = `Bearer ${jwtToken}`;

    res.setHeader("Authorization", bearerToken);

    res.status(200).json({
      message: "User logged in succesfully",
      token: jwtToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
}

module.exports = {
  postSignup,
  postSignin,
  putUser,
  getBulk,
  getUser,
};
