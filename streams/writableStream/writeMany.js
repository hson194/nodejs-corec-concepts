
// //Execution time: 19.364s
// //Resource: CPU - 107% Mem - 0.4%
// const fs = require('fs/promises');
// const { Buffer } = require('node:buffer');

// (async () => {
//   console.time('Auto generate content');

//   let millionHandleFile = await fs.open('./million.txt', 'w');
//   for(let i=0; i<1000000; i++) {
//     let buffer = Buffer.from(`${i} `);

//     await millionHandleFile.write(buffer);
//   }

//   console.timeEnd('Auto generate content');
// })();


// //Execution time: 2.803s
// //Resource: CPU - 245% Mem - 5.3%
// const fs = require('node:fs');

// (() => {
//   console.time('Auto generate content');

//   fs.open('./million.txt', 'w', (err, fd) => {
//     for(let i=0; i<1000000; i++) {
//       // Execution time: 2.803s
//       let buffer = Buffer.from(`${i} `);
//       fs.write(fd, buffer, () => null);

//       // // Execution time: 2.407s
//       // // Keep numbers are ordered
//       // fs.writeSync(fd, `${i} `);
//     }
  
//     //Note: when code log this but still execute logic in Event loop, that why it holds few seconds before close nodeJs
//     console.timeEnd('Auto generate content');  
//   });
// })();

// //10 millions
// //Execution time: 5.570s
// //Resource: CPU - 134% Mem - 12%
// const fs = require('fs/promises');
// const { Buffer } = require('node:buffer');

// (async () => {
//   console.time('Auto generate content');

//   let millionHandleFile = await fs.open('./million.txt', 'w');
  
//   const stream = millionHandleFile.createWriteStream();

//   //10 millions
//   for(let i=0; i<10000000; i++) {
//     let buffer = Buffer.from(`${i} `);
//     stream.write(buffer);
//   }

//   console.timeEnd('Auto generate content');
// })();

// //Stream
// const fs = require('fs/promises');
// const { Buffer } = require('node:buffer');

// (async () => {
//   console.time('Auto generate content');

//   let millionHandleFile = await fs.open('./million.txt', 'w');
  
//   const stream = millionHandleFile.createWriteStream();

//   //REMOVE ME
//   console.log('Size of stream', stream.writableHighWaterMark);
//   console.log('Length of stream', stream.writableLength);

//   // //1e+7 = 100mb
//   const buffer = Buffer.alloc(1e+8, 10); // Increasing used resource: ~125mb of RAM
//   console.log('buffer', buffer);

//   setInterval(() => null, 1000); //For keep this application not close

//   console.timeEnd('Auto generate content');
// })();


// //Verify internal buffer of stream full or not
// const fs = require('fs/promises');
// const { Buffer } = require('node:buffer');

// (async () => {
//   console.time('Auto generate content');

//   let millionHandleFile = await fs.open('./million.txt', 'w');
  
//   const stream = millionHandleFile.createWriteStream();

//   //REMOVE ME
//   console.log('Size of stream', stream.writableHighWaterMark);
  
//   console.log(stream.write(Buffer.alloc(16383, 'a'))); // Result: true
//   console.log(stream.write(Buffer.alloc(1, 'a'))); // Result: false
//   console.log(stream.write(Buffer.alloc(1, 'a'))); // Result: false
  
//   console.log('Length of stream', stream.writableLength);

//   stream.on('drain', () => {
//     console.log('Stream has already empty itself');
//   });

//   console.timeEnd('Auto generate content');
// })();


//Refactor logic for optimizing performance
//10 millions
//Execution time: 5.570s
//Resource: CPU - 71% Mem - 0.5%
const fs = require('fs/promises');
const { Buffer } = require('node:buffer');

(async () => {
  console.time('Auto generate content');

  let millionHandleFile = await fs.open('./million.txt', 'w');
  
  const stream = millionHandleFile.createWriteStream();

  let currentIndex = 0;
  for(let i=0; i<1000000; i++) {
    let buffer = Buffer.from(`${i} `);

    //REMOVE ME
    // console.log(i);

    if(!stream.write(buffer)) {
      currentIndex = i;
      break;
    }
  }

  stream.on('drain', () => {
    // console.log('Drained !!!')

    for(let i=(currentIndex + 1); i<1000000; i++) {
    let buffer = Buffer.from(`${i} `);
    currentIndex = i;

    if(i==999999) {
      stream.end(buffer); //End stream ~ no more data will be written
      break;
    }

    if(!stream.write(buffer)) {
      break;
    }
  }});

  stream.on('finish', () => {
    console.timeEnd('Auto generate content');
  })
  
})();
