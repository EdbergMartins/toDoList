const bcrypt = require('bcrypt');
const connection = require('./conections')

const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};


const getUsers = async () => {
  const users = await connection.execute('SELECT * FROM users ORDER BY id ASC;');
  return users
}

const registerUser = async (user) => {
  const { email, password } = user;
  try {
    const passwordCrypto = await hashPassword(password);
    const createdDateUtc = new Date(Date.now());
    const userse = getUsers()
    const unicUser = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (unicUser[0].length === 0) {
      const [createUser] = await connection.execute('INSERT INTO users (email, password, created_at) VALUES (?, ?, ?)', [email, passwordCrypto, createdDateUtc]);
      return createUser
    } else {
      return 'Usuário já cadastrado';
    }
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    throw error;
  }
};


module.exports = {
  registerUser,
  getUsers
};