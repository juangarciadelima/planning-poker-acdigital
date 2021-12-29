const express = require('express');
const { resolve } = require('path');
const app = express();

app.use(express.static(
  resolve(
    __dirname,
    './build'
  )
));

app.listen(process.env.PORT || 3000, (err) => {
   if(err)
      console.log('Error ==> ', err);
   console.log('Server is up!');
});