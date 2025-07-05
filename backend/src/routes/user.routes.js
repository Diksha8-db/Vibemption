import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUser,
  updateCoverImage,
  getCurrentUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { uploadFile } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(uploadFile.single("coverImage"), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update-details").patch(verifyJWT, updateUser);
router.route("/refreshToken").post(refreshAccessToken)
router.route("/user-dashboard").get(verifyJWT, getCurrentUser);
router
  .route("/update-cover")
  .patch(verifyJWT, uploadFile.single("coverImage"), updateCoverImage);


export default router;
