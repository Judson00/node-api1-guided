const express = require('express'); //CommonJS Modules

const Hubs = require('./data/hubs-model.js');

const server = express();

//teaches express how to read JSON from the body
server.use(express.json()); //needed for POST and PUT/PATCH

server.get(`/`,(req, res) => {
  res.json({ Hello: `Web26` })
})

// view a list of hubs
server.get(`/api/hubs`, (req, res) => {
  // go and get the hubs from the db
  Hubs.find().then(hubs => {
    res.status(200).json(hubs);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: `whoops` })
  });
})

//add a hub
server.post(`api/hubs`, (req, res) => {
  //the data will be in the body of the req
  const hubInfo = req.body;
  //validate the data, if valid, save
  Hubs.add(hubInfo)
  .then(hub => {
    res.status(201).json(hub)
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: 'whoops'})
  })
})

//delete a hub
server.delete(`/api/hubs/:id`, (req,res) => {
  const { id } = req.params;
  Hubs.remove(id).then(removed => {
    res.status(200).json(removed);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: 'whoops'})
  })
})

const port = 5000;
server.listen(port, () => console.log(`/n** API on port ${port} /n`));