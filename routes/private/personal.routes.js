const router = require("express").Router();
const { checkAnon, checkLogin } = require("../../middleware/auth.middleware");
const fileUploader = require("../../config/cloudinary.config");
const UserModel = require("../../models/User.model");


router.get("/", checkLogin, (req, res, next) => {
  res.render("users/user-profile");
});

router.route("/edit")
.get((req, res)=>{
  res.render("users/edit-profile");
})
.post(fileUploader.single("imgUrl"), (req, res)=>{
  const id = req.session.currentUserId;
  const username = req.body.username;

  const imgUrl = req.file.path;

  UserModel.findByIdAndUpdate(id, {username, imgUrl}, {new: true})
  .then((user)=>{
    res.render("users/user-profile", {userInSession: user})});

});

module.exports = router;