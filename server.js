const net = require('net');
const fs = require('fs');
const path = require('path');

// let filePath = path.join(__dirname, '..', 'public' 'test.txt');
// console.log(filePath);

// let fileContents;

// fs.readFile(filePath, (err, data) => {

// })

// console.log(fileContents);

let content = {"./hydrogen.html": "hydrogen", "./helium.html": "helium", "./index.html": "index", "./css/styles.css": "css"};

const server = net.createServer((request) => {

  // server.getConnections(function(err, count){
  //   request.write('What is your request?\n');
  // });

  request.on('data', (data) => {
    // console.log(data);
    let message = data.toString().split("\r\n");
    console.log(message);

    let reqLine = message[0].split(" ");
    // console.log(reqLine);
    let method = reqLine[0];
    let reqURI = `.${reqLine[1]}`;
    console.log(reqURI);
    let httpV = reqLine[2];

    // makeResponse(reqURI);
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
          let output = `HTTP/1.1 ${status}
Server: MyServer
Date: ${date}
Content-Type: text/html; charset=utf-8
Content-Length: ${length}
Connection: keep-alive

${element}`;
          console.log(output);
          request.write(output, (err) => {
            request.end();
          });
        });
      }else if(reqURI !== key && count === 4){
        status = "404 Not Found"
        return fs.readFile('./404.html', 'utf8', (err, data) => {
          element = data;
          length = data.length;
          let output1 = `HTTP/1.1 ${status}
Server: MyServer
Date: ${date}
Content-Type: text/html; charset=utf-8
Content-Length: ${length}
Connection: keep-alive

${element}`;
          console.log(output1);
          request.write(output1, (err) => {
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

// function makeResponse(uri){
//   let date = new Date().toString();
//   let element = null;
//   let status = null;
//   for(let key in content){
//     if(uri === key){
//       status = "200 OK"
//       return fs.readFile(key, 'utf8', (err, data) => {
//         console.log("inside readFile");
//         console.log(data);
//         if (err) throw err;
//         // console.log(data.toString());
//         element = data;
//         // console.log(element);
//         return `HTTP/1.1 ${status}
// Server: MyServer
// Date: ${date}
// Content-Type: text/html; charset=utf-8
// Content-Length:
// Connection: keep-alive

// ${element}`;
//       });
//     }
//   }
// }

function read(element, cb){
  let filePath = path.join(__dirname, element);
  fs.readFile(filePath, 'uft8', (err, data) => {
    if (err) { return cb(err); }

    response += fileContents;

    fin(socket, response, (err) => {
      if(err) { console.log(err); }
      return cb(data);
    })
  });
}

function fin(socket, data, cb){
  socket.write(response, (err) => {
    if (err) { return cb(err); }
    else {
      socket.end();
      return cb;
    }
  })
}