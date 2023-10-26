const connection = require('./conections')

const getAll = async (id) => {
  const tasks = await connection.execute(`SELECT * FROM tasks WHERE usuario_id=${id}`);
  return tasks
} 

const createTask = async (task) => {
  const { title, description, id: usuario_id } = task.body;
  const createdDateUtc = new Date(Date.now())
  const query = 'INSERT INTO tasks(title,status,description,usuario_id,created_at) VALUES(?,?,?,?,?)';
  console.log(description)
  const [createTask] = await connection.execute(query, [title, 'Pendente', description, usuario_id, createdDateUtc]);
  const [itemCreated] = await connection.execute(`SELECT * FROM tasks WHERE usuario_id=${usuario_id} ORDER BY id DESC LIMIT 1;`)
  return { itemCreated };
}

const deleteTask = async (id) => {
  const query = await connection.execute(`DELETE FROM tasks WHERE id=${id}`);
  return;
}

const atualizeStatusTask = async (task) => {
  const { id, status } = task.body;
  const query = await connection.execute(`UPDATE tasks SET status = "${status}" WHERE id = ${id};`)
}

const atualizeDescritionTask = async (id, description) => {
  const query = await connection.execute(`UPDATE tasks SET description = "${description}" WHERE id = ${id};`)
}

module.exports = {
  getAll,
  createTask,
  deleteTask,
  atualizeStatusTask,
  atualizeDescritionTask
}