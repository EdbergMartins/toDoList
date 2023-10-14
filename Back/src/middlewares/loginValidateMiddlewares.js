const jwt = require('jsonwebtoken');

const verificaToken = (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  jwt.verify(token, process.env.KEY_JWT, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = {
  verificaToken
};
