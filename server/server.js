var express = require('express')
var app = express()
var bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

let urls=[{
  shortURL: '/shortURL!',
  realURL: 'www.google.com'
}]

app.get('/urls', (request, response) => {

  response.send(urls);
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var port_number = process.env.PORT || 3001

app.listen(port_number, function () {
  console.log('RrrarrrrRrrrr server alive on port 3001')
})
