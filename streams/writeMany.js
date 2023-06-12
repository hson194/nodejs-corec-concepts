const fs = require('fs/promises');
const { Buffer } = require('node:buffer');

(async () => {
  console.time('Auto generate content');

  let millionHandleFile = await fs.open('./million.txt', 'w');
  for(let i=0; i<1000000; i++) {
    let buffer = Buffer.from(`${i} `);

    await millionHandleFile.write(buffer);
  }

  console.timeEnd('Auto generate content');
})();
