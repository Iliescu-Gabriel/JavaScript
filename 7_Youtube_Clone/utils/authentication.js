const { isTokenValid } = require("./tokenHandler");

const authenticateUser = async (token) => {
  if (!token) {
    return null;
  }
  try {
    const payload = await isTokenValid(token);
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { authenticateUser };
