const IPFS = require('ipfs');
const node = new IPFS();

node.on('error', errorObject => console.error('IPFS ERRdOR', errorObject));
node.on('ready', () => {
  // Your node is now ready to use \o/
  console.log('START IPFS');
/*
  // stopping a node
  node.stop(() => {
    // node is now 'offline'
    console.log('STOP IPFS');
  })*/
  node.files.add({
    path: 'hello.txt',
    content: Buffer.from('Hello World')
  }, (err, filesAdded) => {
    if (err) console.log('ERR', err);


    // Once the file is added, we get back an object containing the path, the
    // multihash and the sie of the file
    console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash);
    const fileMultihash = filesAdded[0].hash;
    node.files.cat(fileMultihash, (err, data) => {
      if (err) console.log('ERR', err);

      console.log('\nFile content:')
      // print the file to the terminal and then exit the program
      process.stdout.write(data)
    })
  })
});
