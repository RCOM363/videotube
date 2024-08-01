import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  // multer middleware - process multiple files
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/get-current-user").post(verifyJWT, getCurrentUser);
router.route("/update-account-details").post(verifyJWT, updateAccountDetails);
router.route("/update-user-avatar").post(
  upload.single({
    name: "avatar",
    maxCount: 1,
  }),
  verifyJWT,
  updateUserAvatar
);
router.route("/update-user-coverimage").post(
  upload.single({
    name: "coverImage",
    maxCount: 1,
  }),
  verifyJWT,
  updateUserCoverImage
);

export default router;
