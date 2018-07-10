import IPFS from 'ipfs-api';

const ipfs = IPFS('localhost', '5002', { protocol: 'http' });

export const uploadFile = file => {
  console.log('START UPLOAD', file);
  if (!file) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = event => resolve(event.target.result);
    fileReader.onerror = error => reject(error);
    fileReader.readAsArrayBuffer(file);
  }).then(arrayBuffer => new Promise((resolve, reject) =>
    ipfs.files.add({
      path: file.name,
      content: Buffer.from(arrayBuffer)
    }, (error, filesAdded) => {
      if (error) return reject(error);
      console.log('UPLOADED', filesAdded);
      resolve(filesAdded[0]);
    })
  ));
};
