import * as mongoose from 'mongoose';

import CommunityModel from '../../models/CommunityModel';

const storedData = {};
const rawData = {
  Community: [
    {
      'poolAddress' : '0x1e515c651b4b576d080d72d92d481fcfc7911921',
      'name' : 'test1',
      'title' : 'Test Community - 1',
      'description' : 'test community',
      'icon' : 'faCogs',
      'disputesSolved' : 0
    },
    {
      'poolAddress' : '0xdf55ca22c7a22831b87053e04f9d54312e40ea34',
      'name' : 'test2',
      'title' : 'Test Community - 2',
      'description' : 'test community',
      'icon' : 'faMicrochip',
      'disputesSolved' : 0
    },
    {
      'poolAddress' : '0x9950b69761c8142444e271b9591d7962f96c3a7e',
      'name' : 'test3',
      'title' : 'Test Community - 3',
      'description' : 'test community',
      'icon' : 'faBook',
      'disputesSolved' : 0
    },
    {
      'poolAddress' : '0xc0eeda53b188b24f0c8c63f17ab4050b4b532fb7',
      'name' : 'test4',
      'title' : 'Test Community - 4',
      'description' : 'test community',
      'icon' : 'faBolt',
      'disputesSolved' : 0
    },
    {
      'poolAddress': '0x469ca2b67f1698e83186e6f007b517d1e7611e52',
      'name': 'test5',
      'title': 'Test Community - 5',
      'description': 'test community',
      'icon': 'faCloud',
      'disputesSolved': 0
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
    version: '0.0.2',
    requiredVersion: '0.0.1'
  });
}

export {
  migrate,
  getInfo
};
