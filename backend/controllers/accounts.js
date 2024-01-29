
const mongoose = require("mongoose");
const { Account } = require("../db/schema");
const { transferValidate } = require("../zod");
const { delay } = require("../utils/utils");

async function transfer(req, res, next) {
  const { amount, to } = req.body;
  const userId = req.userId;
  const session = await mongoose.startSession();
  try {
    const { success } = transferValidate.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ message: "Not a valid post" });
    }

    session.startTransaction();

    const userAccount = await Account.findOne({ userId: userId }).session(
      session
    );

    if (!userAccount) {
      await session.abortTransaction();
      throw new Error("Invalid user account re login");
    }

    if (!userAccount || userAccount.balance < amount) {
      await session.abortTransaction();
      throw new Error("Insufficient funds.");
    }

    const recipientAcc = await Account.findOne({ userId: to }).session(session);

    if (!recipientAcc) {
      throw new Error("Invalid account");
    }

    await Account
      .updateOne({ userId: userId }, { $inc: { balance: -amount } })
      .session(session);
    await Account
      .updateOne({ userId: to }, { $inc: { balance: amount } })
      .session(session);

    await session.commitTransaction();
    res.status(200).json({ message: "Transfer successful" });
  } catch (err) {
    return res.status(411).json({ message: err.message });
  }
}

async function getBalance(req, res, next) {
  const userId = req.userId;
  try {
    const account = await Account.findOne({ userId: userId });

    await delay(2000)

    res.status(200).json({ balance: account?.balance });
  } catch (err) {
    res.status(411).json({ message: "Something went wrong" });
  }
}

module.exports = {
  getBalance,
  transfer,
};
