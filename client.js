const net = require('net');
const fs = require('fs');

const server = new net.Socket();

server.connect(8080, '0.0.0.0', () => {
  console.log('connected to server');
  let hostURI = process.argv[2];
  let host = hostURI.split("/")[0];
  let uri = hostURI.split("/")[1];
  console.log(host, uri);

  let newReq = buildRequest("GET", host, uri);

  server.write(newReq);
  server.pipe(process.stdout);


});

server.on('end', () => {
  console.log('ended connection');
});

function buildRequest(method, host, uri){
  let request = `${method} /${uri} HTTP/1.1\r
Date: ${new Date().toString()}\r
Host: ${host}\r
User-Agent: Test`
  return request;
}