const IPFSFactory = require('ipfsd-ctl');
const f = IPFSFactory.create({ type: 'js' });

f.spawn({ defaultAddrs: true, disposable: false }, (err, ipfsd) =>  {
  if (err) throw err;


  ipfsd.init(err => {
    if (err && !err.message.includes('repo already exists') && !err.message.includes('ipfs configuration file already exists!')) throw err;

    ipfsd.start((err, api) => {
      if (err) throw err;

      console.log('IPFS STARTED');
      /*
      ipfsd.api.id(function (err, id) {
        console.log(id);
      });*/
    });
  });
});
