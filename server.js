const net = require('net');
const fs = require('fs');
const path = require('path');

const content = {"./hydrogen.html": "hydrogen", "./helium.html": "helium", "./index.html": "index", "./css/styles.css": "css"};

const server = net.createServer((request) => {

  request.on('data', (data) => {
    let message = data.toString().split("\r\n");
    let reqLine = message[0].split(" ");
    let method = reqLine[0];
    let reqURI = `.${reqLine[1]}`;
    let httpV = reqLine[2];
    let date = new Date().toString();
    let element = null;
    let status = null;
    let length = null;
    let count = 0;

    for(let key in content){
      count++;
      if(reqURI === key){
        status = "200 OK"
        return fs.readFile(key, 'utf8', (err, data) => {
          if (err) throw err;
          element = data;
          length = data.length;
          let head = `HTTP/1.1 ${status}
Server: MyServer
Date: ${date}
Content-Type: text/html; charset=utf-8
Content-Length: ${length}
Connection: keep-alive\n\n`;
          let body = `${element}\n`;
          let both = `HTTP/1.1 ${status}
Server: MyServer
Date: ${date}
Content-Type: text/html; charset=utf-8
Content-Length: ${length}
Connection: keep-alive

${element}\n`
          if(method === "GET"){
            request.write(both, (err) => {
              request.end();
            });
          }else if(method === "HEAD"){
            request.write(head, (err) => {
              request.end();
            });
          }
        });
      }else if(reqURI !== key && count === 4){
        status = "404 Not Found"
        return fs.readFile('./404.html', 'utf8', (err, data) => {
          element = data;
          length = data.length;
          let output = `HTTP/1.1 ${status}
Server: MyServer
Date: ${date}
Content-Type: text/html; charset=utf-8
Content-Length: ${length}
Connection: keep-alive

${element}\n`;
          request.write(output, (err) => {
            request.end();
          });
        });
      }
    }
    console.log("hello");
  });
});

server.listen(8080, () => {
  console.log('listening on port 8080');
});

// function readReq(data, cb){
//   let message = data.toString().split("\r\n");
//   let reqLine = message[0].split(" ");
//   let method = reqLine[0];
//   let reqURI = `.${reqLine[1]}`;
// }

// function makeReq(method, uri){
//   if(method === "GET"){

//   }
// }

// function read(element, cb){
//   let filePath = path.join(__dirname, element);
//   fs.readFile(filePath, 'uft8', (err, data) => {
//     if (err) { return cb(err); }

// function write(output){

// }
//     response += fileContents;

//     fin(socket, response, (err) => {
//       if(err) { console.log(err); }
//       return cb(data);
//     })
//   });
// }

// function fin(socket, data, cb){
//   socket.write(response, (err) => {
//     if (err) { return cb(err); }
//     else {
//       socket.end();
//       return cb;
//     }
//   })
// }