const singInUsersModule = require('../modules/singInUsersModule')

const singInUsers = async (rec, res) => {
  const user = await singInUsersModule.loginUser(rec);
  return user.message ? res.status('400').json(user) : res.status('200').json(user)
}

module.exports = {
  singInUsers
}