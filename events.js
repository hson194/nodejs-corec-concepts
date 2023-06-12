const { log } = require('console');
const {EventEmitter, errorMonitor} = require('events');

const eventEmitter = new EventEmitter();


eventEmitter.on('foo', () => {
  log('Event occurred 1');
})

// eventEmitter.on('foo', () => {
//   log('Event occurred 2');
// })

// eventEmitter.on('foo', (x) => {
//   log('Event occurred 3');
//   log(x);
// })

// eventEmitter.on('foo', (x) => {
//   log('Event occurred 3');
//   log(x);
// })

eventEmitter.on('baz', function test(x) {
  log('Event occurred baz');
  log(x);
})

//=== pass params ===
// eventEmitter.emit('foo', 3000);

// eventEmitter.emit('baz', 2000);

//=== asynchronous ===
// eventEmitter.on('event', (a, b) => {
//   process.nextTick(() => {
//     console.log('this happens asynchronously');
//   })
// });

// eventEmitter.emit('event', 'a', 'b');
// console.log('first');
// for(let i=0; i<9000000000; i++){}
// console.log('second');
// eventEmitter.emit('foo');

//=== handel error ===
// if have not listener register 'error' event or errorMonitor, node process will be crashed, 
//the error is thrown, a stack trace is printed, and the Node.js process exits.
eventEmitter.on('error', (err) => {
  log(err.message);
})
eventEmitter.on(errorMonitor, (err) => {
  log(err.message);
})

eventEmitter.emit('foo');
eventEmitter.emit('error', new Error('Whoops'));
eventEmitter.emit('baz');

//=== other APIs ===
// log(eventEmitter.listenerCount('foo'));
// log(eventEmitter.rawListeners('baz'));
