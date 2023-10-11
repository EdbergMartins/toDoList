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
  const [itemCreated] = await connection.execute('SELECT * FROM tasks ORDER BY id DESC LIMIT 1;')
  return { itemCreated };
}

const deleteTask = async (task) => {
  const { id } = task;
  const query = await connection.execute(`DELETE FROM tasks WHERE id =${id}`);
  return;
}

const atualizeStatusTask = async (task) => {
  const { id, status } = task.body;
  const query = await connection.execute(`UPDATE tasks SET status = "${status}" WHERE id = ${id};`)
}

module.exports = {
  getAll,
  createTask,
  deleteTask,
  atualizeStatusTask
}