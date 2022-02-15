const router = require("express").Router();
const { checkAnon, checkLogin } = require("../../middleware/auth.middleware");
const fileUploader = require("../../config/cloudinary.config");
const UserModel = require("../../models/User.model");

/* GET home page */
router.get("/", checkLogin, (req, res, next) => {
  res.render("profile");
});

router.route("/edit")
.get((req, res)=>{
  res.render("edit-profile");
})
.post(fileUploader.single("imgUrl"), (req, res)=>{
  const id = req.session.currentUserId;
  const username = req.body.username;

  const imgUrl = req.file.path;

  UserModel.findById(id, {username, imgUrl}, {new: true})
  .then((user)=>{res.render("user-profile", {userInSession: user})});

});

module.exports = router;