import * as mongoose from 'mongoose';

import CommunityModel from '../../models/CommunityModel';

const storedData = {};
const rawData = {
  Community: [
    {
      'poolAddress' : '0xe406503b2bcee18fdfb1011f0d323ca529842eb0',
      'name' : 'web-dev',
      'title' : 'Web-development DRM',
      'description' : 'Web-development DRM',
      'icon' : 'faCogs',
      'disputesSolved' : 0
    },
    {
      'poolAddress' : '0x77db20f2cff5bfb9acc655daf4cf96c0be4bb18a',
      'name' : 'goods',
      'title' : 'Goods quality assessment',
      'description' : 'Goods quality assessment',
      'icon' : 'faShoppingBasket',
      'disputesSolved' : 0
    },
    {
      'poolAddress' : '0x63a4583034c95afd2541ae07d048d5bbd85ddc9b',
      'name' : 'financial',
      'title' : 'Financial data oracles',
      'description' : 'Financial data oracles',
      'icon' : 'faCreditCard',
      'disputesSolved' : 0
    },
    {
      'poolAddress' : '0x030b1198428440361fb73c710090bf9ddff39af0',
      'name' : 'smart-contracts',
      'title' : 'Smart-contracts experts',
      'description' : 'Smart-contracts experts',
      'icon' : 'faFile',
      'disputesSolved' : 0
    },
    {
      'poolAddress' : '0xd15d873a331bf97f60aa24613b39cc884446d0ce',
      'name' : 'court',
      'title' : 'Digital Arbitrage Court',
      'description' : 'Digital Arbitrage Courts',
      'icon' : 'faBook',
      'disputesSolved' : 0
    },
    {
      'poolAddress' : '0x8def390e5b964c38a392a6e7f80bee0f4e633525',
      'name' : 'san-francisco',
      'title' : 'San Francisco property assessment pool',
      'description' : 'San Francisco property assessment pool',
      'icon' : 'faAnchor',
      'disputesSolved' : 0
    },
    {
      'poolAddress' : '0x4b55f678ea18d1fb7b84387aad6b0e4c60d018be',
      'name' : 'construction',
      'title' : 'Construction engineers',
      'description' : 'Construction engineers',
      'icon' : 'faMagic',
      'disputesSolved' : 0
    },
    {
      'poolAddress' : '0x65f0ad173f22837e64dd39dafefe9a65a984b420',
      'name' : 'drivers',
      'title' : 'Drivers',
      'description' : 'Drivers',
      'icon' : 'faBus',
      'disputesSolved' : 0
    }
  ]
};


function fillCollection(model) {
  return new Promise(async resolve => {
    const modelName = model.modelName;

    let collection = rawData[modelName];
    if (typeof (collection) === 'function') {
      collection = collection();
    }

    for (const i in collection) {
      const data = collection[i];
      for (const prop in data) {
        if (typeof (data[prop]) === 'function') {
          data[prop] = data[prop]();
        }
      }
      const inst = await (new model(data)).save();
      storedData[modelName] = storedData[modelName] || [];
      storedData[modelName].push(inst);
    }
    resolve();
  });
}

function migrate() {
  return Promise.resolve()
    .then(async () => {
      await fillCollection(CommunityModel);
    });
}

function getInfo() {
  return Promise.resolve({
    version: '0.0.3',
    requiredVersion: '0.0.2'
  });
}

export {
  migrate,
  getInfo
};
