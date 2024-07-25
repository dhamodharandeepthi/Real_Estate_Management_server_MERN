const Agent = require("../models/Agent");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config()

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const agent = new Agent({ name, email, password });
    await agent.save();

    const payload = { agent: { id: agent.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { agent: { id: agent.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
