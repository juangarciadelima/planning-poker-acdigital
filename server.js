const express = require('express');
const { resolve } = require('path');
const app = express();

const port = process.env.PORT || 3000

if(process.env.NODE_ENV === "production"){
  app.use(express.static('build'))
  app.get('/*', (req, res) => {
    res.sendFile(resolve(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, (err) => {
   if(err) console.log('Error ==> ', err);
   console.log('Server is up!');
});