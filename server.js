const net = require('net');
const fs = require('fs');

const helium = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - Helium</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>Helium</h1>
  <h2>H</h2>
  <h3>Atomic number 2</h3>
  <p>Helium is a chemical element with symbol He and atomic number 2. It is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas that heads the noble gas group in the periodic table. Its boiling and melting points are the lowest among all the elements and it exists only as a gas except in extremely cold conditions.</p>
  <p><a href="/">back</a></p>
</body>
</html>`

const hydrogen = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Elements - Hydrogen</title>
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <h1>Hydrogen</h1>
  <h2>H</h2>
  <h3>Atomic number 1</h3>
  <p>Hydrogen is a chemical element with chemical symbol H and atomic number 1. With an atomic weight of 1.00794 u, hydrogen is the lightest element on the periodic table. Its monatomic form (H) is the most abundant chemical substance in the universe, constituting roughly 75% of all baryonic mass. Non-remnant stars are mainly composed of hydrogen in its plasma state. The most common isotope of hydrogen, termed protium (name rarely used, symbol 1H), has a single proton and zero neutrons.</p>
  <p><a href="/">back</a></p>
</body>
</html>`

let content = {"hydrogen": hydrogen, "helium": helium};

const server = net.createServer((request) => {

  request.on('data', (data) => {
    // console.log(data);
    let message = data.toString().split("\r\n");
    // console.log(message);

    let reqLine = message[0].split(" ");
    // console.log(reqLine);
    let method = reqLine[0];
    let reqURI = reqLine[1];
    // console.log(reqURI);
    let httpV = reqLine[2];

    console.log(makeResponse(method, reqURI));

  });
});

server.listen(8080, () => {
  console.log('listening on port 8080');
});

function makeResponse(uri){
  let date = new Date().toString();
  let element = null;
  for(let key in content){
    if(uri === `/${key}.html`){
      element = content[key];
      // console.log(element);
      return `HTTP/1.1 200 OK
Server: MyServer
Date: ${date}
Content-Type: text/html; charset=utf-8
Content-Length: ${element.length}
Connection: keep-alive

${element}`;
    }
  }
}