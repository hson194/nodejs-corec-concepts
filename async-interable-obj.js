let i = 1;
function somethingAsync(time) {
  console.log("fired");
  return delay(time).then(() => {
    
    if(time == 3000) {
      throw new Error(`Error: ${time}`)
    }

    return Promise.resolve(i++);
  });
}
const items = [1000, 2000, 3000, 4000];

function delay(time) {
  return new Promise((resolve) => { 
      setTimeout(resolve, time)
  });
}

(async() => {
  console.time("first way");
  const promises = await Promise.all(items.map(e => somethingAsync(e).catch(e => console.log(e))));
  for (const res of promises) {
    console.log(res);
  }
  console.timeEnd("first way");

  // i=1; //reset counter
  // console.time("second way");
  // for await (const res of items.map(e => somethingAsync(e))) {
  //   // do some calculations
  //   console.log(res);
  // }
  // console.timeEnd("second way");
})();
