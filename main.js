const http = require('http');
const fs = require('fs/promises');

const server = http.createServer(async (request, response) => {
  const contentBuffer = await fs.readFile(__dirname + '/hello.txt');
  const status = 200;
  response.statusCode = status;
  response.setHeader('Content-Type','text/plain');
  response.end(contentBuffer.toString());
})

const port = 8001;
server.listen(port, () => {
  console.log(`Server start at ${port}`);
});
