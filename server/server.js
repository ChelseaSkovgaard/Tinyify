var express = require('express')
var app = express()
var bodyParser = require('body-parser');
const path = require('path');
const md5 = require('md5');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


let urls=[{
  shortURL: "shortURL!!",
  realURL: "www.google.com",
  folder: "Cool Links"
},
{
  shortURL: "shortURL2",
  realURL: "www.turing.io",
  folder: "School"
},
{
  shortURL: "shortURL3",
  realURL: "www.react.com",
  folder: "Codez"
},
{
  shortURL: "shortURL4",
  realURL:"www.funtimesturing.com",
  folder: "School"
}]

app.locals.folders = {
  0: "initial folder",
  1: "second folder"
};

app.locals.urls = {
  0:{
    folderid: "1",
    shorturl: 0,
    actualurl: 'www.google.com',
    date: Date.now(),
    clickCount: 0
  }
}

app.locals.shortURL = 0;

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders);
});

app.post('/api/folders', (request, response) => {
  const { folderName } = request.body;
  const id = md5(folderName);
  app.locals.folders[id] = folderName;
  response.json({ id, folderName})
})

app.get('/api/folders/:id', (request, response) => {
  const {id} = request.params
  const folder = app.locals.folders[id]

  if(!folder){
    response.sendStatus(404);
  }
  response.json({id, folder})
})

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
})

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var port_number = process.env.PORT || 3001

app.listen(port_number, function () {
  console.log('RrrarrrrRrrrr server alive on port 3001')
})
