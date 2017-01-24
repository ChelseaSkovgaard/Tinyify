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
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var port_number = process.env.PORT || 3001

app.listen(port_number, function () {
  console.log('RrrarrrrRrrrr server alive on port 3001')
})
