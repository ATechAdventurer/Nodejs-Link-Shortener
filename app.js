let express = require('express')
let storage = require('node-persist')
let app = express()
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));

let init = () => {
  storage.initSync()
  
  //return links ? links : storage.setItem('links', {}) && {}
}
let save = (val) => {
  storage.setItem('links', val)
}

let newLink = (title, url) => {
  storage.setItem(title,url)
}

init();

app.route('/new').get(function(req, res){
  res.sendfile(__dirname +  "/index.html")
}).post(function(req, res){
  let {title, url} = req.body
  console.log(title, url);
  newLink(title, url)
  res.send("<h4>Success</h4>")
})

app.get('/_:title', function(req, res){
  console.log(storage.getItem('links'));
  storage.getItem(req.param.title, function(value){
    console.log(value);
    res.end();
  })
});

app.listen(8080)