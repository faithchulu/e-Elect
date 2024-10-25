const express = require("express");
const {
  initRegister,
  verifyRegister,
  initAuth,
  verifyAuth,
} = require("../controller/scanController");

const scanRouter = express.Router();

scanRouter.get("/init-register", initRegister);
scanRouter.post("/verify-register", verifyRegister);
scanRouter.get("/init-auth", initAuth);
scanRouter.post("/verify-auth", verifyAuth);

module.exports = scanRouter;
