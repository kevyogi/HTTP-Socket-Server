const net = require('net');
const fs = require('fs');

const server = new net.Socket();

server.connect(8080, '0.0.0.0', () => {
  console.log('connected to server');
  let initialReq = process.argv.splice(2);
  // console.log(initialReq.length);
  // console.log(initialReq);
  if(initialReq.length === 1){
    let host = initialReq[0].split("/")[0];
    let uri = initialReq[0].split("/")[1];
    let newReq = buildRequest("GET", host, uri);
    server.write(newReq, () => {
      server.on('data', (data) => {
        let response = data.toString();
        let body = response.split(/\n\s*\n/);
        process.stdout.write(body[1]);
      })
    });
    // server.pipe(process.stdout);
  }else if(initialReq.length === 2 && initialReq[0] === "-I"){
    let host = initialReq[1].split("/")[0];
    let uri = initialReq[1].split("/")[1];
    let newReq = buildRequest("HEAD", host, uri);
    server.write(newReq);
    server.pipe(process.stdout);
  }else{
    console.log("You gotta give some to get some.");
    server.end();
  }

});

server.on('end', () => {
  console.log('ended connection');
});

function buildRequest(method, host, uri, I){
  let request = `${method} /${uri} HTTP/1.1\r
Date: ${new Date().toString()}\r
Host: ${host}\r
User-Agent: Test`
  return request;
}