const mongoose = require('mongoose');
const Todo = require('./index.js');

const seedData = [
  {
    name: 'study for TA',
    priority: 100
  },
  {
    name: 'play smash',
    priority: 1
  },
  {
    name: 'go to wedding',
    priority: 2
  }
];

const seedFunction = () => {
  Todo.create(seedData)
    .then(() => {
      console.log(`database seeded`);
      mongoose.connection.close();
    })
    .catch(err => console.log(err));
};

seedFunction();
