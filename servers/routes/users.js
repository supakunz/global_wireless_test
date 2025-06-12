const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authProtect");
const {
  getAllUsers,
  getUsersID,
  createUsers,
  updateUsers,
  deleteUsers,
  loginUsers,
} = require("../controllers/users");

// Public routes (ไม่ต้องล็อกอินก็เข้าถึงได้)
router.route("/login").post(loginUsers);

// Protected routes (ต้องล็อกอินก่อน)
router
  .route("/")
  .get(protect, getAllUsers) // ต้องล็อกอินก่อนดูผู้ใช้ทั้งหมด
  .post(createUsers) // (ไม่ต้องล็อกอินก็เข้าถึงได้)
  .delete(protect, deleteUsers); // ต้องล็อกอินก่อนลบผู้ใช้

router
  .route("/:id")
  .get(protect, getUsersID) // ต้องล็อกอินก่อนดูผู้ใช้รายตัว
  .put(protect, updateUsers); // ต้องล็อกอินก่อนอัพเดตผู้ใช้

module.exports = router;
