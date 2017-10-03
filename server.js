const net = require('net');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  server.on('')

  // server.on('request' (request) => {
  //   let message = request.split("\n\n");
  //   let header = message[0];
  //   let body = message[2];
  // })
})

server.listen(8080, () => {
  console.log('listening on port 8080');
});