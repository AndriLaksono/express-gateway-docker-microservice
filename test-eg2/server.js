const path = require('path');
const gateway = require('express-gateway');

console.log("Masukk");

gateway()
  .load(path.join(__dirname, 'config'))
  .run();
