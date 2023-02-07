const {
  createTokenUser,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
} = require("./tokenHandler");

const { authenticateUser } = require("./authentication");

module.exports = {
  createTokenUser,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  authenticateUser,
};
