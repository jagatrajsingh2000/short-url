// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }
const jwt = require('jsonwebtoken');
const secret = "Jagat123@"

function setUser(user) {
    return jwt.sign({
        _id:user._id,
        email: user.email,
    }, secret);
}

function getUser(token) {
    if(!token) return null;
    return jwt.verify(token,secret);
}

module.exports = {
  setUser,
  getUser,
};