import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const authToken = req.headers.authorization;

  if (typeof authToken !== "undefined") {
    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET_KEY, err => {
      if (err) {
        res.status(401).json({
          statusMessage: "This resource is forbidden, acess key expired"
        });
      } else {
        next();
      }
    });
  } else {
    // Forbidden
    res
      .status(401)
      .json({
        statusMessage: "This resource is unauthorised, no access token found"
      });
  }
}
export { authenticate };
