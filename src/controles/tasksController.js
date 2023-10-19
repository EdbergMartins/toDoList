const tasksModule = require('../modules/tasaksModule');


const getAll = async (rec, res) => {
  const id = rec.params.id;
  const tasks = await tasksModule.getAll(id);
  return res.status('200').json(tasks[0])
}

const createTask = async (rec, res) => {
  const createdTasks = await tasksModule.createTask(rec);
  return res.status('201').json(createdTasks)
}

const deleteTask = async (rec, res) => {
  const id = rec.params.id
  const deleteTask = await tasksModule.deleteTask(id);
  return res.status('200').json({menssage: 'Task deleted succefully'})
}

const atualizeStatusTask = async (rec, res) => {
  const atualizeStatusTask = await tasksModule.atualizeStatusTask(rec);
  return res.status('200').json({ message: 'Task ataulized' });
}

module.exports = {
  getAll,
  createTask,
  deleteTask,
  atualizeStatusTask
}