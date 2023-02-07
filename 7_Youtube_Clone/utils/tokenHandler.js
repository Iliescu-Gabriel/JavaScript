const jwt = require("jsonwebtoken");

const createTokenUser = (user) => {
  return { name: user.name, userId: user._id, role: user.role };
};

const createJWT = ({ tokenUser }) => {
  const token = jwt.sign(tokenUser, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const attachCookiesToResponse = ({ res, user }) => {
  // Create the access token and refresh token
  const token = createJWT({ tokenUser: { user } });
  // access token expires in 24 hours
  const accessTokenExpiration = 1000 * 60 * 60 * 24;
  // Attach the signed cookies to response (https only) with their expiration dates
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + accessTokenExpiration),
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
};
