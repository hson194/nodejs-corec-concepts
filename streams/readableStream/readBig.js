const fs = require('node:fs/promises');

(async () => {
	console.time('Read & write to new data');

	const readableFileHandle = await fs.open('./million.txt', 'r');

	const readableStream = readableFileHandle.createReadStream();

	// const readableStream = readableFileHandle.createReadStream({highWaterMark: 400}); //Set size of internal buffer

	//Size
	console.log(readableStream.readableHighWaterMark); //64kb

	const writableFileHande = await fs.open('./dest.txt', 'w');
	const writableStream = writableFileHande.createWriteStream();

	// First solution
	// readableStream.on('data', (chunk) => { //Just when stream listen event 'data', stream start to read file

	// 	if(chunk.length < readableStream.readableHighWaterMark) {
	// 		writableStream.end(chunk);
	// 	}

	// 	if(writableStream.writable) {
	// 		writableStream.write(chunk);
	// 	}else {
	// 		writableStream.on('drain', () => {
	// 			writableStream.write(chunk);
	// 		});
	// 	};
	// });

	//Officially solution
	readableStream.on('data', (chunk) => {
		if(chunk.length < readableStream.readableHighWaterMark) {
			writableStream.end(chunk);
		}else if(!writableStream.write(chunk)) {
			readableStream.pause();
		}
	});

	writableStream.on('drain', () => {
		readableStream.resume();
	})

	writableStream.on('finish', () => {
		console.timeEnd('Read & write to new data');
	})

})()
