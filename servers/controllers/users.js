// const UserSchema = require("../models/UserModel");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// 🔐 ENV CONFIG
const JWT_SECRET = process.env.JWT_SECRET || "secret_ecom";

// ✅ GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log("All Users Fetched");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ CREATE USER
const createUsers = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check duplicate email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: "Duplicate email address.",
      });
    }

    // hashPassword --> ป้องpassword
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
        role: role || "user",
      },
    });

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Create User Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ LOGIN USER
const loginUsers = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.json({ success: false, errors: "Invalid email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ success: false, errors: "Invalid password." });
    }

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ GET USER BY ID
const getUsersID = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json([user]); // 👈 Send as array to match frontend
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE USER
const updateUsers = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  try {
    const data = {
      name: username,
      email,
      role,
    };

    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    console.log("User updated:", updatedUser);
    res.json({ message: "Update User Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE USER
const deleteUsers = async (req, res) => {
  const { id, name } = req.body;

  try {
    await prisma.user.delete({ where: { id } });
    console.log("Removed User:", name);
    res.json({ success: true, name });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✨ EXPORT CONTROLLERS
module.exports = {
  getAllUsers,
  getUsersID,
  createUsers,
  updateUsers,
  deleteUsers,
  loginUsers,
};
