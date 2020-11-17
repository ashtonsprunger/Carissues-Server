module.exports = function (request, response, next) {
  let user = request.user;
  if (user.admin) {
    next();
  } else {
    response.send(401, "Not admin!");
  }
};
