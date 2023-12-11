require('events').EventEmitter.defaultMaxListeners = 15;

const express = require('express');
const cors = require('cors');

const app = express();

// Use the cors middleware
app.use(cors({
  origin: '*'
}));

// Your routes and other middleware...

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});