const path = require('path');

// TODO: Add comment explaining role of route below
// Sends the index.html file when someone visits /.
module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );
