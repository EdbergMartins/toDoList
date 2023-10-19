const registerModule = require('../modules/registerModule')

const registerUser = async (rec, res) => {
  const user = await registerModule.registerUser(rec.body);
  return res.status('200').json(user)
}

const getUsers = async (rec, res) => {
  const users = await registerModule.getUsers();
  return res.status('201').json(users[0])
}

module.exports = {
  registerUser,
  getUsers
}