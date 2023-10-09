const tasaksModule = require('../modules/tasaksModule');

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
  const { body } = rec;
  const [allTasks] = await tasaksModule.getAll();
  
  if (body.id === undefined) {
    return res.status(400).json({ message: 'The field id can not by undefined' });
  }
  if (body.id === '') {
    return res.status(400).json({ message: 'The field id can not by empty' });
  }

  let taskFound = false;

  allTasks.forEach(e => {
    if (e.id == body.id) {
      taskFound = true;
    }
  });

  if (taskFound) {
    next();
  } else {
    return res.status(400).json({ message: 'Task has not been found' });
  }
}


module.exports = {
  validateBody,
  validateDelite
}