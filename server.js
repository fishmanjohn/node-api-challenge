const express = require('express');
const cors = require('cors')
const server = express();
server.use(express.json())
server.use(cors())
server.use(logger)
const router = require('./data/router')
server.get('/', (req, res) => {
  res.send(`<h2>Server Running!</h2>`);
});
server.use('/api/projects',router)



//custom middleware

function logger(req, res, next) {
  
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}` 
  )

  next();
}

module.exports = server;