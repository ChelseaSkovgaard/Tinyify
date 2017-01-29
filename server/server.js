var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const path = require('path');
const md5 = require('md5');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/folders', (request, response) => {
  database('folders').select()
  .then(function(folders) {
      response.status(200).json(folders);
    })
  .catch(function(error) {
    console.error('somethings wrong with db');
  });
});

app.post('/api/folders', (request, response) => {
  const { folderName } = request.body;
  const folder = {name: folderName, created_at: new Date};
  database('folders').insert(folder)
    .then(function(){
      database('folders').select()
        .then(function(folders){
          response.status(200).json(folders);
        })
        .catch(function(error) {
          console.error('somethings wrong with db'+ error);
          response.status(404);
        });
    });
});

app.delete('/api/folders/:id', (request, response) => {
  const { id } = request.params
  database('folders').where('id', id).first().del()
    .then(function(url){
      response.status(200).json({message: 'folder deleted'});
    });
});

app.get('/api/urls/:folder_id', (request, response) => {
  database('urls').where('folder_id', request.params.folder_id).select()
  .then(function(urls) {
    response.status(200).json(urls);
  })
  .catch(function(error) {
    console.error('somethings wrong with db');
  });
});

function generateRandomString() {
  let characterArray = []
  for(var i = 0; i < 6; i++){
    characterArray.push(String.fromCharCode(97 + Math.floor(Math.random()*25) +1 ))
  }
  return characterArray.join('');
}

app.post('/api/urls', (request, response) => {
  const { actualurl, clickCount, folder_id} = request.body;
  let string = generateRandomString();
  database('urls').select('shorturl').then(function(res){
    let array = res.map((item)=>{
      return item.shorturl;
    });
    while(array.includes(string)){
      string = generateRandomString();

    }
    let shorturl = string
    const url = { actualurl: `http://${actualurl}`, shorturl, clickCount,
        folder_id, created_at: new Date};
    database('urls').insert(url)
      .then(function(){
        database('urls').select()
          .then(function(urls){
            response.status(200).json(urls);
          })
          .catch(function(error) {
            console.error('somethings wrong with db'+ error);
            response.status(404);
          });
      });
  });
});

app.delete('/api/urls/:id', (request, response) => {
  const { id } = request.params
  database('urls').where('id', id).first().del()
    .then(function(url){
      response.status(200).json({message: 'secret deleted'});
    });
});



app.get('/a/:shorturl', (request, response) => {
  database('urls').where('shorturl', request.params.shorturl).select()
    .then(function(url) {
      database('urls').where('shorturl', request.params.shorturl).update({
        clickCount: url[0].clickCount+1
      })
    .then(function(){
      response.redirect(`${url[0].actualurl}`);
    });
  });
});

app.get('/api/urls', (request, response) => {
  database('urls').select()
  .then(function(urls) {
      response.status(200).json(urls);
    })
  .catch(function(error) {
    console.error('somethings wrong with db');
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var port_number = process.env.PORT || 3001

app.listen(port_number, function () {
  console.log('RrrarrrrRrrrr server alive on port 3001')
});

module.exports = app;
