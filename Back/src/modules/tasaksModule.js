const connection = require('./conections')

const getAll = async () => {
  const tasks = await connection.execute('SELECT * FROM tasks');
  return tasks
} 

const createTask = async (task) => {
  const { title, description } = task;
  const createdDateUtc = new Date(Date.now())
  const query = 'INSERT INTO  tasks(title,status,description,created_at) VALUES(?,?,?,?)';
  const [createTask] = await connection.execute(query, [title, 'Pendente', description, createdDateUtc]);
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