const zod = require("zod");

const signupValidate = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

const signinValidate = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const userUpdateValidate = zod.object({
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
  password: zod.string().optional(),
});

const transferValidate = zod.object({
  amount: zod.number(),
  to: zod.string(),
})

module.exports = {
  signupValidate,
  signinValidate,
  userUpdateValidate,
  transferValidate
};
