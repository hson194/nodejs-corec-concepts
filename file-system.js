// // Promise API
// const fs = require("fs/promises");

// async function main() {
//   try {
//     console.log('Start copy file');

//     await fs.copyFile("./hello.txt", "./hello-promise.txt");

//     console.log('Copy file: done');
//   } catch (error) {
//     console.log("Promise API copyFile", error);
//   }
// }

// // Callback API
// const fs = require('fs');

// function main() {
//   console.log('Start copy file');

//   // Move to event loop, when call stack empty, it will be excuted
//   fs.copyFile("./hello.txt", "./hello-callback.txt", (err) => {
//     if(err) {
//       console.log("Callback API copyFile", err)
//     } else {
//       console.log('Copy file: done');
//     }
//   })

//   console.log('Copy file: processing');
// }

// Synchronous API
const fs = require('fs');
function main() {
  console.log('Start copy file');

  function copy(callback) {
    fs.copyFileSync("./hello.txt", "./hello-sync.txt");
    callback();
  }

  copy(() => console.log('Copy file: done'));

  console.log('Log exit');
}


main();
