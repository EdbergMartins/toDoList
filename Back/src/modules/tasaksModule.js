const connection = require('./conections')

const getAll = async () => {
  const tasks = await connection.execute('SELECT * FROM tasks');
  return tasks
} 

const createTask = async (task) => {
  const { title } = task;
  const createdDateUtc = new Date(Date.now()).toUTCString()
  const query = 'INSERT INTO  tasks(title,status,created_at) VALUES(?,?,?)';
  const [createTask] = await connection.execute(query, [title, 'Pendente', createdDateUtc]);
  return {insertId:  createTask.insertId};
}

const deleteTask = async (task) => {
  const { id } = task;
  const query = await connection.execute(`DELETE FROM tasks WHERE id =${id}`);
  return;
}

module.exports = {
  getAll,
  createTask,
  deleteTask
}