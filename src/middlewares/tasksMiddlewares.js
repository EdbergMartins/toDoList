const tasaksModule = require('../modules/tasaksModule');
const connection = require('../modules/conections')

const validateBody = (rec, res, next) => {

  const { body } = rec;
  if (body.title === undefined) {
    return res.status(400).json({ message: 'The field title can not by undefined' });
  }
  if (body.title === '') {
    return res.status(400).json({ message: 'The field title can not by empty' });
  }
  next();
}

const validateDelite = async (rec, res, next) => {
  const id = rec.params.id;
  const task = await connection.execute(`SELECT * FROM tasks WHERE id=${id}`);
  if (id === undefined) {
    return res.status(400).json({ message: 'The field id can not by undefined' });
  }
  if (id === '') {
    return res.status(400).json({ message: 'The field id can not by empty' });
  }
  let taskFound = false;
  if (id) {
    taskFound = true;
    next();
  } else {
    return res.status(400).json({ message: 'Task has not been found' });
  }
}

module.exports = {
  validateBody,
  validateDelite
}