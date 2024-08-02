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
  getChannelProfile,
  getWatchHistory,
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
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails); // use patch when updating few values
router.route("/update-avatar").patch(
  verifyJWT, // the user should be verifies before sending the file
  upload.single("avatar"),
  updateUserAvatar
);
router
  .route("/update-coverimage")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/channel/:username").get(verifyJWT, getChannelProfile);
router.route("/watch-history").get(verifyJWT, getWatchHistory);

export default router;
