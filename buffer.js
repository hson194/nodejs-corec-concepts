const buff = Buffer.alloc(8);
buff.write('string');
console.log(buff.toString('utf-8'));
console.log(buff.toJSON());
console.log(buff[0]);

let buff2 = Buffer.from([115, 116, 114, 105,
  110, 103], 'hex');
console.log(buff2.toString('utf-8'));

let buff3 = Buffer.from('E6849B', 'hex');
console.log(buff3.toString('utf-8'));
