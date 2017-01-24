var express = require('express')
var app = express()
var bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

let urls=[{
  shortURL: "shortURL!",
  realURL: "www.google.com"
},
{
  shortURL: "shortURL2",
  realURL: "www.turing.io"
},
{
  shortURL: "shortURL3",
  realURL: "www.react.com"
},
{
  shortURL: "shortURL4",
  realURL:"www.funtimesturing.com"
}]

app.get('/urls', (request, response) => {

  response.send(JSON.stringify(urls));
});

app.post('/urls', (request, response) => {

    //   var user = new User(req.body);
    //
    //   user.save(function(err) {
    //     if (err) {
    //       res.send(err)
    //     }
    //     User.find(function(err, users) {
    //       res.send('success!')
    //     })
    //   })
    urls.push(request.body)
    console.log(request.body);
})

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var port_number = process.env.PORT || 3001

app.listen(port_number, function () {
  console.log('RrrarrrrRrrrr server alive on port 3001')
})
