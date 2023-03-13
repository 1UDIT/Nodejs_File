const express = require('express');
const cors = require('cors');
const app = express();
const port = 8888;

app.use(cors());

let time = 10;
let countdown = setInterval(update, 1000);
let test;
function update() {
  // let min = Math.floor(time / 60);
  // let sec = time % 60;

  if (time == 0) {
    test = time;  
    // console.log(`test${time}`);
    time = 10;
  } else {
    // console.log(`${time}`);
    test = time;
    time--;
  }
}


app.get('/', (req, res, next) => {
  const auth = { Username: 'admin', password: 'pass' }
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [Username, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  var body = {
    'up': test
  }; 

  if (Username && password && Username === auth.Username && password === auth.password) {
    res.send(body); 
    return next()
  }

  console.log("Request data:");
  console.log(req);
  res.status(401).send('Authentication required.') // custom message

})

app.listen(port, () => {
  console.log("port started");
})