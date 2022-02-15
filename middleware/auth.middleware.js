function checkLogin(req, res, next){
  if(req.session && !req.session.currentUserId) return res.redirect("/login"); //this return should be an error
  next();
};

function checkAnon(req, res, next){
  if(req.session && req.session.currentUserId) return res.redirect("/"); //this return should be an error
  next();
};

module.exports = {checkLogin, checkAnon};