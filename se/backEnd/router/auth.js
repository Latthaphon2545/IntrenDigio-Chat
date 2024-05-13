const exprees = require("express");
const { check } = require("express-validator");

const router = exprees.Router();

router.get(
  "/register",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is not valid").isLength({ min: 6, max: 12 }),
  ],
  (req, res) => {
    res.send("Register");
  }
);

module.exports = router;
