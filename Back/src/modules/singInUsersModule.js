const bcrypt = require('bcrypt');
const connection = require('./conections')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const loginUser = async (user) => {
  const { email, password } = user.body;
  const keyJwt = process.env.KEY_JWT;
  const keySalts = parseFloat(process.env.HASH_CRYPTO);

  // Use uma consulta parametrizada para evitar SQL injection
  const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);

  if (users.length === 1) {
    const user = users[0];
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (verifyPassword) {
      const token = jwt.sign({ username: email }, keyJwt, { expiresIn: '1h' });
      return { email: user.email, jwtToken: token };
    }
  }

  return { message: 'Falha na autenticação' };
}


module.exports = {
  loginUser
}