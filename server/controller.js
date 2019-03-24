const Todo = require('../database/index.js');

const controller = {
  get: (req, res) => {
    Todo.find({})
      .sort({ priority: -1 })
      .then(docs => {
        res.status(200).send(docs);
      })
      .catch(err => console.log(error));
  },
  post: (req, res) => {
    const newTodo = req.body;
    Todo.create(newTodo)
      .then(docs => {
        res.status(201).send('added a todo');
      })
      .catch(err => console.log(err));
  },
  delete: (req, res) => {
    const _id = req.params;
    Todo.deleteOne(_id)
      .then(() => {
        res.status(202).send('delete a todo');
      })
      .catch(err => console.log(err));
  },
  put: (req, res) => {
    const _id = req.params;
    Todo.findByIdAndUpdate(_id, req.body)
      .then(() => {
        res.status(200).send('updated a todo');
      })
      .catch(err => console.log(err));
  }
};

module.exports = controller;
