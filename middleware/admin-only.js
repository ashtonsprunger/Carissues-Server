module.exports = function (request, response, next) {
  if (request.method == "OPTIONS") {
    next();
  } else {
    let user = request.user;
    if (user.admin) {
      next();
    } else {
      response.send(401, "Not admin!");
    }
  }
};
