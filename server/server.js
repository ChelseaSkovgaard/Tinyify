var express = require('express')
var app = express()
var bodyParser = require('body-parser');
const path = require('path');
const md5 = require('md5');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/folders', (request, response) => {
  database('folders').select()
  .then(function(folders) {
        response.status(200).json(folders);
      })
      .catch(function(error) {
        console.error('somethings wrong with db')
      });
});

app.post('/api/folders', (request, response) => {
  const { folderName } = request.body;
  const folder = {name: folderName, created_at: new Date};
  database('folders').insert(folder)
    .then(function(){
      database('folders').select()
        .then(function(folders){
          response.status(200).json(folders)
        })
        .catch(function(error) {
                    console.error('somethings wrong with db'+ error)
                    response.status(404)
                  });
    })
});

app.get('/api/folders/:id', (request, response) => {
  const {id} = request.params
  const folder = app.locals.folders[id]

  if(!folder){
    response.sendStatus(404);
  }
  response.json({id, folder})
});

app.post('/api/folders/:folderid', (request,response) => {
  const {folderid} = request.params
  const {actualurl} = request.body

  const id = md5(actualurl);
  app.locals.urls[id] = {
    folderid,
    actualurl,
    shorturl: app.locals.shortURL,
    date: Date.now(),
    clickCount: 0
  }

  app.locals.shortURL++

  response.json(app.locals.urls)
});



app.get('/api/folders/:folderid/:shorturl', (request, response) => {
  const {folderid, shorturl} = request.params
  const url = app.locals.urls[shorturl]

  response.json(url)
});

app.patch('/api/urls/:id', (request, response) => {
  const {id} = request.params

  app.locals.urls[id].clickCount++

  response.json(app.locals.urls[id].clickCount);
});

app.get('/api/urls', (request, response) => {
  const url = app.locals.urls
  response.json(url)
})

app.get('/a/:shorturl', (request, response) => {
  const {shorturl} = request.params

  if(!app.locals.urls[shorturl]){
    response.sendStatus(404)
  }
  app.locals.urls[shorturl].clickCount++

  response.redirect(`http://${app.locals.urls[shorturl].actualurl}`)
})

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var port_number = process.env.PORT || 3001

app.listen(port_number, function () {
  console.log('RrrarrrrRrrrr server alive on port 3001')
})

module.exports = app
